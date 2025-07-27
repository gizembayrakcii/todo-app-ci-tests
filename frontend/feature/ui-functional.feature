Feature: Functional UI Automation

  Background:
    Given I launch the app

  Scenario: Login with valid credentials
    Given I launch the app
    When I login with username "admin" and password "1234"
    Then I should see "Todo List"

  Scenario: Login with invalid credentials
    Given I launch the app
    When I login with username "admin" and password "wrong"
    Then I should see "Invalid credentials"

  Scenario: Create a new todo item
    Given I launch the app
    Given I am on the todo page
    When I enter "Walk the cat" into the todo input
    And I click the "Add" button
    Then I should see "Walk the cat"

  Scenario: Edit a todo item
    Given I launch the app
    And I am on the todo page
    And I enter "Walk the cat" into the todo input
    And I click the "Add" button
    And "Walk the cat" exists in the list
    When I click the "Edit" button for "Walk the cat"
    And I update it to "Feed the cat"
    Then I should see "Feed the cat"

  Scenario: Delete a todo item
    Given I launch the app
    And I am on the todo page
    And I enter "Delete me" into the todo input
    And I click the "Add" button
    When I click the "Delete" button for "Delete me"
    Then I should not see "Delete me"

