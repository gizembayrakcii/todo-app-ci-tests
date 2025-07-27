Feature: Login Feature

  Scenario: Successful login
    Given the API base URI is set
    When the user logs in with username "admin" and password "1234"
    Then the response status code should be 200
    And the token should be present in the response

  Scenario: Login with missing fields
    Given the API base URI is set
    When the user sends a login request without username or password
    Then the response status code should be 400
    And the message should be "Username and password are required"

  Scenario: Login with invalid credentials
    Given the API base URI is set
    When the user logs in with username "admin" and password "wrongpassword"
    Then the response status code should be either 401 or 403
    And the message should include "Invalid"

  Scenario: Login with invalid data type
    Given the API base URI is set
    When the user logs in with username "testuser" and password number 123456
    Then the response status code should be 400
