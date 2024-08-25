Feature: Tautologies

  @canary
  Scenario: Logical Tautologies
    * truth is true
    * truth is not untrue
    * untruth is false

  @canary
  Scenario: Mathematical Tautologies
    * 1 plus 1 equals 2
    * the sum of 1 and 1 is 2

  @canary
  Scenario Outline: Summing Numbers
    Given two numbers <x> and <y>
    Then the sum is <sum>

    Examples:
      | x | y  | sum |
      | 1 |  2 |   3 |
      | 1 | -1 |   0 |
      | 0 |  0 |   0 |

  @canary
  Scenario: Summing Numbers (Variant)
    * the following summation data is accurate
      | addend1 | addend2 | sum |
      |       1 |       2 |   3 |
      |       1 |      -1 |   0 |
      |       0 |       0 |   0 |
