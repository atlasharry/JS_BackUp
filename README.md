# JS_BackUp

(This is a backup of both frontend and backend of the YY-music site.)

**We use this repo to build up the testing codes for both the frontend and backend.**

In addition to the back up, we also have codes related to Unit Testing and Continuous Integration(Python pytest, Jest, PHPUnit, GitHub Actions, Generative AI) for COMP 333: Software Engineering 2023
Homework 5

## Python test

### Problem 1 (unit test without pytest)

Please run the code at PythonCode/problem1.py (Through terminal)

```
python -u "PythonCode/problem1.py"
```

### Problem 2 (unit test with pytest)

How to set up the environment: (Through terminal)

```
pip install pytest
```

Run the test: (Through terminal)

```
pytest
```

## Backend Test

### Environment Config

Please setup the phpunit following testing-tutorial on class website.

### How to run

Navigate to the backend folder of backend

```
cd backend
./vendor/bin/phpunit tests/StackTest.php
```

### Hard coded id (song_id), username, password

For testRegister, testLogin, testFailLogin:
the unsername and password are hard coded, make sure such user doesn't exist in the database before the test.

```
'username' => 'test_admin',
'password' => '1234567890aaa',
```

In the testUpdateSong and testDeleteSong tests, we use the song_id as a parameter to identify the specific song we want to update or delete. This song_id is automatically generated and incremented in our SQL database whenever a new song is added.

Therefore, when writing or updating these tests, it's crucial to ensure that the song_id used in the test matches the song_id of the song you expect to be present in the database. This is because the song_id in the database will automatically increment each time a new song is added.

In other words, if you're writing a test to update or delete a song that you've just inserted into the database for testing purposes, you need to know the song_id that was assigned to that song and use it in your test. If the song_id in the test doesn't match any song_id in the database, the test will fail because it can't find the song it's supposed to update or delete.

```
'id' => '53',
'username' => 'test_admin',
'song_artist' => 'test_admin',
'song_name' => 'admin_song',
'song_rating' => '4',
```

```
'id' => '53',
'username' => 'test_admin',
```
