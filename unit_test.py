# import the unit_testing_sample_code module
import unit_testing_sample_code as utsc
import pytest

# def teststring(test_num, expected, actual):
#     if expected == actual:
#         print("Test " + str(test_num) + " passed!" + str(expected) + " matches " + str(actual) + ".")
#     else: 
#         print("Test " + str(test_num) + " failed. Expected:" + str(expected) + ". Got: " + str(actual) + ".")

# def teststrlist(test_num, expected_list, actual_list):
#     print("Test " + str(test_num) + ": ")
#     for i in range(0, len(expected_list)):
#         if expected_list[i] == actual_list[i]:
#             print("Part " + str(i) + " in test " + str(test_num) + " passed!" + str(expected_list[i]) + " matches " + str(actual_list[i]) + ".")
#         else: 
#             print("Part " + str(i) + " in test " + str(test_num) + " failed. Expected:" + str(expected_list[i]) + ". Got: " + str(actual_list[i]) + ".")

# def testint(test_num, expected, actual):
#     if expected == actual:
#         print("Test " + str(test_num) + " passed!" + str(expected) + " matches " + str(actual) + ".")
#     else: 
#         print("Test " + str(test_num) + " failed. Expected:" + str(expected) + ". Got: " + str(actual) + ".")

# def testintlist(test_num, expected_list, actual_list):
#     print("Test " + str(test_num) + ": ")
#     for i in range(0, len(expected_list)):
#         if expected_list[i] == actual_list[i]:
#             print("Part " + str(i) + " in test " + str(test_num) + " passed!" + str(expected_list[i]) + " matches " + str(actual_list[i]) + ".")
#         else: 
#             print("Part " + str(i) + " in test " + str(test_num) + " failed. Expected:" + str(expected_list[i]) + ". Got: " + str(actual_list[i]) + ".")

# print("\nString Capitalizer Tests:")
# # test_string is the function for testing the string capitalizer and takes 
# # three arguments: test number (“0”), expected output value (“TwO”), and
# # the call to the string_capitalizer function with the argument “two”.
# teststring("0", "TwO", utsc.string_capitalizer("two"))
# teststring("1", "C", utsc.string_capitalizer("c"))
# teststring("2", "FouR", utsc.string_capitalizer(4))
# teststring("3", "", utsc.string_capitalizer(""))

# print("\nList Capitalizer Tests:")
# teststrlist("0", ["TwO","C","FouR",""], utsc.capitalize_list(["two","c",4,""]))

# print("\nInteger Manipulator Tests:")
# testint("0", 66, utsc.integer_manipulator(10))
# testint("1", 2, utsc.integer_manipulator(2))
# testint("2", 6, utsc.integer_manipulator(3))
# testint("3", 0, utsc.integer_manipulator(0))
# testint("4", 1, utsc.integer_manipulator("three"))

# print("\nManipulate List Tests:")
# testintlist("0", [66,2,6,0,1], utsc.manipulate_list([10,2,3,0,"three"]))

def test_string_1():
    assert "TwO" == utsc.string_capitalizer("two")

def test_string_2():
    assert "C" == utsc.string_capitalizer("c")

def test_string_3():
    assert "FouR" == utsc.string_capitalizer('four')

def test_string_4():
    assert "" == utsc.string_capitalizer("")

def test_str_list_1():
    assert ["TwO","C","FouR",""] == utsc.capitalize_list(["two","c","4",""])

def test_int_1():
    assert 66 == utsc.integer_manipulator(10)

def test_int_2():
    assert 2 == utsc.integer_manipulator(2)

def test_int_3():
    assert 6 == utsc.integer_manipulator(3)

def test_int_4():
    assert 0 == utsc.integer_manipulator(0)

def test_int_list_2():
    assert [66,2,6,0,0] == utsc.manipulate_list([10,2,3,0,1])



# @pytest.mark.parametrize("input_string, expected_output", [
#     ("two", "TwO"),
#     ("c", "C"),
#     (4, "FouR"),  # Assuming your function can handle numeric inputs
#     ("", "")
# ])
# def test_string_capitalizer(input_string, expected_output):
#     assert utsc.string_capitalizer(input_string) == expected_output

# # Test cases for list capitalizer
# def test_capitalize_list():
#     input_list = ["two", "c", 4, ""]
#     expected_output = ["TwO", "C", "FouR", ""]
#     assert utsc.capitalize_list(input_list) == expected_output

# # Test cases for integer manipulator
# @pytest.mark.parametrize("input_int, expected_output", [
#     (10, 66),
#     (2, 2),
#     (3, 6),
#     (0, 0),
#     ("three", 1)  # Assuming your function can handle string inputs
# ])
# def test_integer_manipulator(input_int, expected_output):
#     assert utsc.integer_manipulator(input_int) == expected_output

# # Test cases for manipulate list
# def test_manipulate_list():
#     input_list = [10, 2, 3, 0, "three"]
#     expected_output = [66, 2, 6, 0, 1]
#     assert utsc.manipulate_list(input_list) == expected_output

