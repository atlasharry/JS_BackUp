<?php
use PHPUnit\Framework\TestCase;


class StackTest extends TestCase
{
    // For testing the API
    protected $client;

    protected function setUp() : void{
        parent::setUp();
        $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost/YY_Music_JS/backend/index.php"]);
    }

    // register
    public function testRegister(): void{
        $data = [
            'json' => [
                'username' => 'test_admin',
                'password' => '1234567890aaa',
            ]
            ];
        $response = $this->client->request('POST', '?action=register', $data);
        $this->assertEquals(201, $response->getStatusCode());
    }

    // login:
    public function testLogin(): void{
        $data = [
            'json' => [
                'username' => 'test_admin',
                'password' => '1234567890aaa',
            ]
            ];
        $response = $this->client->request('POST', '?action=login', $data);
        $this->assertEquals(200, $response->getStatusCode());
    }

    // fail login
    public function testFailLogin(): void{
        $data = [
            'json' => [
                'username' => 'test_admin',
                'password' => '1234567890aaax',
            ],
            'http_errors' => false
        ];
        $response = $this->client->request('POST', '?action=login', $data, ['http_errors' => false]);
        $this->assertEquals(401, $response->getStatusCode());
    }

    // create song
    public function testCreateSong(): void{
        $data = [
            'json' => [
                'id' => '1',
                'username' => 'test_admin',
                'song_artist' => 'test_admin',
                'song_name' => 'admin_song',
                'song_rating' => '5',
            ]
        ];
        $response = $this->client->request('POST', '?action=createSong', $data);
        $this->assertEquals(201, $response->getStatusCode());
    }

    // get ratings
    public function testGetRatings(): void{
        $response = $this->client->request('GET', '?action=getRatings');
        $this->assertEquals(200, $response->getStatusCode());
    }

    // update song
    public function testUpdateSong(): void{
        $data = [
            'json' => [
                'id' => '23',
                'username' => 'test_admin',
                'song_artist' => 'test_admin',
                'song_name' => 'admin_song',
                'song_rating' => '4',
            ]
            ];
        $response = $this->client->request('POST', '?action=updateSong', $data);
        $this->assertEquals(200, $response->getStatusCode());
    }

    // delete song
    public function testDeleteSong(): void{
        $data = [
            'json' => [
                'id' => '23',
                'username' => 'test_admin',
            ]
            ];
        $response = $this->client->request('POST', '?action=deleteSong', $data);
        $this->assertEquals(200, $response->getStatusCode());
    }

}


?>



