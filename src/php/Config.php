<?php

/**
* Config accessors
*/
class Config
{

  private static $keys = [];

  public static function get($fileName, $key)
  {
    if (false === file_exists(__DIR__ . '/../../config/'. $fileName .'.json')) {
      throw new Exception("File config/$fileName.json does not exist", 1);
    }

    $configObj = json_decode(file_get_contents(__DIR__ . '/../../config/'. $fileName .'.json'));
    self::$keys = get_object_vars($configObj);

    return self::$keys[$key];
  }
}