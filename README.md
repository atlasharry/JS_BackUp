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

Please setup the phpunit following the offcial document [here](https://docs.phpunit.de/en/9.6/installation.html).

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

## Frontend Test

### Environment Config

before running the test, please make sure you have node and npm installed.

### How to run

In your command line, enter the following command to build the environment and then run the test:

```bash
npm ci
npm test
```

## Generative AI

We used ChatGPT to generate some part of the test. In particular, the fetchMock function in `Songdisplay.test.js` test is generated by ChatGPT. At the time we tried to write the test that examine the search function, we need to mock the case that the frontend fetches the data from the backend. However, we don't know how to mock the fetch function. Therefore, we asked gave our initial code to ChatGPT and asked `"can you help me imporve this test by mocking the backend response and fetch some song info?"`. Then ChatGPT generated the code

```javascript
// The fetchMock part is generated by GPT4
fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(
    JSON.stringify([
      // Mock data: Array of song objects
      { id: 1, username: "user1", artist: "artist1", song: "song1", rating: 3 },
      { id: 2, username: "user2", artist: "artist2", song: "song2", rating: 5 },
    ])
  );
});
```

We then used this code to test our search function.

## Member Contribution

Harry Yu 50%
Patton Yin 50%
