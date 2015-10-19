<?php

/**
* Template engine abstraction
*/
class TemplateEngine
{
  private $engine;
  private $loader;
  private $settings;

  public function __construct()
  {
    $this->loader = new Twig_Loader_Filesystem(__DIR__ . '/' . Config::get('twig', 'viewsDir'));
    $this->defineSettings();
    $this->engine = new Twig_Environment($this->loader, $this->settings);
  }

  public function registerExtensions($extensions)
  {
    foreach ($extensions as $extension) {
      $this->engine->addExtension($extension);
    }
  }

  public function registerFilters($filters)
  {
    foreach ($filters as $filter) {
      $this->engine->addFilter($filter);
    }
  }

  public function getInstance() {
    return $this->engine;
  }

  private function defineSettings()
  {
    if ($this->isDevMode()) {
      $this->settings = array(
        'debug' => true,
      );
    } else {
      $this->settings = array(
        'debug' => false,
        'cache' => Config::get('twig', 'cacheDir'),
      );
    }
  }

  private function isDevMode()
  {
    return (Config::get('app', 'env') === 'dev' || Config::get('app', 'env') === 'preprod');
  }
}