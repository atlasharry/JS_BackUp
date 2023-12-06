<?php

class BaseController
{

  protected function jsonResponse($data, $statusCode)
  {
    //make sure react knows the data is in JSON format
    header('Content-Type: application/json');
    //set up the status code
    http_response_code($statusCode);
    //convert data into JSON
    echo json_encode($data);
  }
}
