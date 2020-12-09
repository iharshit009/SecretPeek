import unittest
import json
from app import app

POST_URL = 'http://127.0.0.1:5000/api/post'
GET_URL = 'http://127.0.0.1:5000/api/get'


class PostConfessionTest(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_successfull_confession(self):
        payload = json.dumps({
            "name": "xyz",
            "message": "This is a dummy confession"
        })

        response = self.app.post(POST_URL, data=payload,
                                 content_type='application/json')
        self.assertEqual(201, response.status_code)


class GetConfessionTest(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_successfull_confession(self):
        response = self.app.get(GET_URL, content_type='application/json')
        self.assertEqual(200, response.status_code)