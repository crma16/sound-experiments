<?php

/**
*
*/
class Router
{
  private $isPartial = false;   // If we want to render all the page or only a chunk to make a transition
  private $datas = [];          // Data sent to the template
  private $routeInfos = [];     // Route informations. i.e, /products/fruits/apple will be [products, fruits, apple]
  private $page;                // Current page dysplayed
  private $twigInstance;


  function __construct($twigInstance)
  {
    $this->twigInstance = $twigInstance;
    $this->isPartial = isset($_GET['c']);
    $this->setPage();
    $this->setDatas();
    $this->checkForCustomPage();
  }

  /**
   * Render the desired page in partial or in complete
   */
  public function render()
  {
    if (false === file_exists(__DIR__ . '/' . Config::get('twig', 'viewsDir') . '/sections/'.$this->page.'/'. $this->page.'.html')) {
      header('HTTP/1.1 404 Not Found', true, 404);
      echo "Sorry, the page you are looking for could not be found.";
      exit;
    }

    if (($this->datas['isIE'] && $this->datas['IEVersion'] < 11.0) || isset($_GET['fallback'])) {
      return $this->twigInstance->render('sections/fallback/fallback.html', $this->datas);
    }

    if ($this->isPartial) {
      $page = $this->twigInstance->render('sections/'.$this->page.'/'. $this->page.'.html', $this->datas);
      $header = $this->twigInstance->render('layouts/header/header.html', $this->datas);
      $compiledViews = [
        'page' => $page,
        'header' => $header
      ];

      return json_encode($compiledViews);
    }

    return $this->twigInstance->render('index.html', $this->datas);
  }

  /**
   * Set an array that will be sent to views
   */
  private function setDatas() {
    $this->datas['page'] = $this->page;
    $this->datas['baseUrl'] = Config::get('app', 'baseUrl');
    $this->datas['rooturl'] = 'http://'.$_SERVER['HTTP_HOST'] . '/';
    $this->datas['isMobile'] = BrowserDetector::isMobile();
    $this->datas['isTablet'] = BrowserDetector::isTablet();
    $this->datas['isIE'] = BrowserDetector::getIsIE();
    $this->datas['IEVersion'] = (int) BrowserDetector::getIEVersion();
  }

  /**
   * Some pages need a specific treatment
   */
  private function checkForCustomPage()
  {
    switch ($this->page) {
      case 'home':
        $this->onHomePage();
        break;
    }
  }

  /**
   * Define the page and routeInfos
   */
  private function setPage()
  {
    $routeTest = isset($_GET['p']) ? $_GET['p'] : '/home';

    $this->routeInfos = explode('/', $routeTest);

    if (!isset($this->routeInfos[1])) {
      $this->routeInfos[1] = 'home';
    }

    $this->page = $this->routeInfos[1];
  }

  /**
   * On home page
   */
  private function onHomePage() {
    $projects = file_get_contents(__DIR__ . '/../../data/projects.json');
    $this->datas['projects'] = json_decode($projects);
  }
}