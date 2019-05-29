Feature: Test
   As I user I want to see the results of a search in the CNN website.

   Scenario Outline: Verify error meessage in search results
     Given I am on the CNN page
      When I search the next word "<word>"
      Then I <expectation> see a error message with the next word "<word>"

    Examples:
    | word    | expectation |
    | NFL     | should not  |
    | NFLFake | should      |