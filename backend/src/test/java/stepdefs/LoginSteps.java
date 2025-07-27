package stepdefs;

import io.cucumber.java.en.*;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assertions;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import java.util.HashMap;
import java.util.Map;

public class LoginSteps {

    // This object holds the HTTP response after an API call
    private Response response;

    // Step to set the base URI for the API tests
    @Given("the API base URI is set")
    public void setApiBaseUri() {
        baseURI = "http://localhost:3001";
    }
    
    // Step to send a POST /login request with given username and password
    @When("the user logs in with username {string} and password {string}")
    public void loginWithCredentials(String username, String password) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("username", username);
        payload.put("password", password);

        response = given()
                .contentType("application/json")
                .body(payload)
                .when()
                .post("/login");
    }
    
    // Step to send a POST /login request without username and password
    @When("the user sends a login request without username or password")
    public void loginWithMissingFields() {
        Map<String, Object> payload = new HashMap<>();
        // intentionally leave fields out

        response = given()
                .contentType("application/json")
                .body(payload)
                .when()
                .post("/login");
    }

    // Step to assert the expected status code of the response
    @Then("the response status code should be {int}")
    public void verifyStatusCode(int statusCode) {
        response.then().statusCode(statusCode);
    }

    // Step to verify that a token is returned in the response body
    @Then("the token should be present in the response")
    public void verifyTokenPresence() {
        response.then().body("token", notNullValue());
    }

    // Step to verify the exact match of a message returned by the API
    @Then("the message should be {string}")
    public void verifyExactMessage(String expectedMessage) {
        response.then().body("message", equalTo(expectedMessage));
    }

    // Step to verify if the response status code is one of two expected values
    @Then("the response status code should be either {int} or {int}")
    public void verifyStatusCodeEither(int code1, int code2) {
        int actualCode = response.getStatusCode();
        Assertions.assertTrue(
            actualCode == code1 || actualCode == code2,
            "Expected status code to be " + code1 + " or " + code2 + " but was " + actualCode
        );
    }
    // Step to verify if the response message contains a given substring
    @Then("the message should include {string}")
    public void verifyMessageIncludes(String expectedPart) {
        String message = response.jsonPath().getString("message");
        Assertions.assertTrue(
            message.contains(expectedPart),
            "Expected message to include: " + expectedPart + " but was: " + message
        );
    }
    
    // Step to test login with a password provided as an integer (invalid type)
    @When("the user logs in with username {string} and password number {int}")
    public void loginWithInvalidPasswordType(String username, int password) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("username", username);
        payload.put("password", password);  // intentionally wrong type (number instead of string)

        response = given()
                .contentType("application/json")
                .body(payload)
                .when()
                .post("/login");
    }

}
