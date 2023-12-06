<?php
/**
 * UserModel class that interacts with the database to handle 
 * user and song related functionalities.
 */
class UserModel
{

  private $db;

   /**

   * Constructor to initialize the database instance.
   */
  public function __construct($database)
  {
    $this->db = $database;
  }

  // Method to verify the user credentials
  public function verifyUserCredentials($username, $password)
  {
    // Check the password associated with the username
    $query = $this->db->getConnection()->prepare("SELECT password FROM username WHERE username = ?");
    $query->bind_param('s', $username);
    $query->execute();
    // Fetch the result of the query.
    $result = $query->get_result();
    $row = $result->fetch_assoc();

    // Verify the hashed password
    if ($row && password_verify($password, $row['password'])) {
      return true;
    } else {
      return false;
    }
    $query->close();
  }


   /**

   * Checks if a user with the given username exists.
   */
  public function checkUserExist($username)
  {
    $query = $this->db->getConnection()->prepare("SELECT password FROM username WHERE username = ?");
    $query->bind_param('s', $username);
    $query->execute();
    // Fetch the result of the query.
    $result = $query->get_result();

    // Check if any rows are returned
    if ($result->num_rows > 0) {
      //user already exist
      return true;
    } else {
      return false;
    }
  }

  /**
   * Registers a new user with the given username and password.
   */
  public function registerUser($username, $password)
  {
    $password = password_hash($password, PASSWORD_DEFAULT);
    $query = $this->db->getConnection()->prepare("INSERT INTO username (username, password) VALUES (?, ?)");
    $query->bind_param('ss', $username, $password);
    $query->execute();
    $query->close();
  }

  /**
   * Retrieves all song ratings from the database.
   */
  public function getAllRatings()
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings");
    $query->execute();
    $result = $query->get_result();

    $rows = [];
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    $query->close();

    return $rows;
  }

  /**
   * Retrieves information about a specific song.
   */
  public function getSongInfo($song_id)
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings WHERE id = ?");
    $query->bind_param('i', $song_id);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
      return [$row['artist'], $row['song'], $row['rating']];
    } else {
      return "wrong";
    }
    $query->close();
  }

  /**
   * Updates song information.
   */
  public function updateInfo($song_id, $artist, $song_name, $song_rating)
  {
    $query = $this->db->getConnection()->prepare("UPDATE ratings SET artist = ?, song = ?, rating = ? WHERE id = ?");
    $query->bind_param('ssii', $artist, $song_name, $song_rating, $song_id);
    $query->execute();
    $query->close();
  }

  /**
   * Validates if a song belongs to the user.
   */
  public function checkValid($song_id, $user_name)
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings WHERE id = ? AND username = ?");
    $query->bind_param('is', $song_id, $user_name);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();
    if ($row) {
      return "true";
    } else {
      return "false";
    }
    $query->close();
  }

  /**
   * Deletes a song from the database.
   */
  public function deleteSong($song_id)
  {
    $query = $this->db->getConnection()->prepare("DELETE FROM ratings WHERE id = ?");
    $query->bind_param('i', $song_id);
    $query->execute();
    $query->close();
  }

  /**
   * Checks if a song already exists for the user.
   */
  public function checkDuplicate($song_name, $user_name, $song_artist)
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings WHERE song = ? AND username = ? AND artist = ?");
    $query->bind_param('sss', $song_name, $user_name, $song_artist);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();
    if ($row) {
      return false;
    } else {
      return true;
    }
    $query->close();
  }

  /**
   * Creates a new song entry in the database.
   */
  public function createSong($song_name, $user_name, $song_artist, $song_rating)
  {
    $query = $this->db->getConnection()->prepare("INSERT INTO ratings (`username`, `artist`, `song`, `rating`) VALUES (?, ?, ?, ?)");
    $query->bind_param('sssi', $user_name, $song_artist, $song_name, $song_rating);
    $query->execute();
    $query->close();
  }
}
