Feature: Weight on Other Planets

  Background:
    Given the planet weight calculator

  Rule: Planet weights can be specified as numeric literals

    Scenario: Weight on Mercury
      When the weight calculated is 200
      Then the weight on Mercury will be exactly 75.6
      And the weight on Mercury will be roughly 75

    Scenario: Weight on Venus
      When the weight calculated is 200
      Then the weight on Venus will be exactly 181.4
      And the weight on Venus will be roughly 180

  Rule: Planet weights can be specified as strings

    Scenario: Weight on Mercury
      When the weight calculated is "200"
      Then the weight on Mercury will be exactly "75.6"

  Rule: Planet weight statements can be stated as business rules

    Scenario: Weight on Mercury
      * a 200 person will weigh exactly 75.6 pounds on Mercury
