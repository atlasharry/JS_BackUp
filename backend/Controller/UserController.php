<?php
// Include necessary models and base controller
require_once __DIR__ . '/../Model/Database.php';
require_once __DIR__ . '/../Model/UserModel.php';
require_once __DIR__ . '/BaseController.php';

// Define the UserController class that extends the BaseController.
class UserController extends BaseController
{
  /**
   * Handles user login logic.
   */
  public function login()
  {
    $input = file_get_contents('php://input');
    // Decode the JSON data into a PHP array.
    $data = json_decode($input, true);
    $username = $data['username'];
    $password = $data['password'];

    $db = new Database();
    $userModel = new UserModel($db);

    // Check if the user credentials are valid
    if ($userModel->verifyUserCredentials($username, $password)) {
      $this->jsonResponse(['success' => true, 'message' => 'Login successful']);
    } else {
      $this->jsonResponse(['success' => false, 'message' => 'wrong username or password']);
    }

    // Close the database connection
    $db->closeConnection();
  }

  /**
   * Handles user registration logic.
   */
  public function register()
  {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $username = $data['username'];
    $password = $data['password'];

    $db = new Database();
    $userModel = new UserModel($db);
    // Check if the user already exist.
    if ($userModel->checkUserExist($username)) {
      $this->jsonResponse(['success' => false, 'message' => 'user already exist']);
    }
    // Register the user.
    else {
      $userModel->registerUser($username, $password);
      $this->jsonResponse(['success' => true, 'message' => 'user registered successfully']);
    }
    $db->closeConnection();
  }

  /**
   * Retrieve all ratings from the database.
   */
  public function getRatings()
  {
    $db = new Database();
    $userModel = new UserModel($db);

    // Retrieve all ratings.
    $ratings = $userModel->getAllRatings();
    $this->jsonResponse($ratings);
    $db->closeConnection();
  }

  /**
   * View a specific song's details.
   */
  public function viewSong()
  {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $song_id = $data["song_id"];

    $db = new Database();
    $userModel = new UserModel($db);

    $song_info = $userModel->getSongInfo($song_id);
    if ($song_info == "wrong") {
      $this->jsonResponse(['success' => false, 'song_info' => $song_info]);
    } else {
      $this->jsonResponse(['success' => true, 'song_info' => $song_info]);
    }
    $db->closeConnection();
  }

  /**
   * Update details of a specific song.
   */
  public function updateSong()
  {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $song_id = $data["id"];
    $user_name = $data["username"];
    $artist = $data["song_artist"];
    $song_name = $data["song_name"];
    $song_rating = $data["song_rating"];

    $db = new Database();
    $userModel = new UserModel($db);

    $check = $userModel->checkValid($song_id, $user_name);
    if ($check == "true") {
      $userModel->updateInfo($song_id, $artist, $song_name, $song_rating);
      $this->jsonResponse(['success' => true, 'message' => 'song updated successfully']);
    } else {
      $this->jsonResponse(['success' => false, 'message' => 'only the user who added the song can update it']);
    }
    $db->closeconnection();
  }

  /**
   * Delete a specific song.
   */
  public function deleteSong()
  {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $song_id = $data["id"];
    $user_name = $data["username"];
    $db = new Database();
    $userModel = new UserModel($db);

    $check = $userModel->checkValid($song_id, $user_name);
    if ($check == "true") {
      $userModel->deleteSong($song_id);
      $this->jsonResponse(['success' => true, 'message' => 'song deleted successfully']);
    } else {
      $this->jsonResponse(['success' => false, 'message' => 'only the user who added the song can delete it']);
    }
  }

  /**
   * Create a new song in the database.
   */
  public function createSong()
  {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $user_name = $data["username"];
    $song_artist = $data['song_artist'];
    $song_name = $data['song_name'];
    $song_rating = $data['song_rating'];

    $db = new Database();
    $userModel = new UserModel($db);

    if ($userModel->checkDuplicate($song_name, $user_name, $song_artist)) {
      $userModel->createSong($song_name, $user_name, $song_artist, $song_rating);
      $this->jsonResponse(['success' => true]);
    } else {
      $this->jsonResponse(['success' => false, 'message' => 'song already exist']);
    }
  }
}
