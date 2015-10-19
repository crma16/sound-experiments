<?php
  require_once '../vendor/autoload.php';
  require_once '../src/php/Config.php';
  require_once '../src/php/BrowserDetector.php';
  require_once '../src/php/TemplateEngine.php';
  require_once '../src/php/Router.php';

  /* --------------------------------------------------------
  Twig setup
  --------------------------------------------------------*/
  $templateEngine = new TemplateEngine();
  $templateEngine->registerExtensions([
    new Twig_Extension_Debug(),
  ]);

  /* --------------------------------------------------------
  Routing
  --------------------------------------------------------*/
  $router = new Router($templateEngine->getInstance());

  echo $router->render();