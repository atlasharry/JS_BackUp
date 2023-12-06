# import the unit_testing_sample_code module
import unit_testing_sample_code as utsc

# Test for the srting_capitalizer function
def teststring(test_num, expected, actual):
    if expected == actual:
        print("Test " + str(test_num) + " passed!" + str(expected) + " matches " + str(actual) + ".")
    else: 
        print("Test " + str(test_num) + " failed. Expected:" + str(expected) + ". Got: " + str(actual) + ".")

# Test for the capitalize_list function
def teststrlist(test_num, expected_list, actual_list):
    print("Test " + str(test_num) + ": ")
    for i in range(0, len(expected_list)):
        if expected_list[i] == actual_list[i]:
            print("Part " + str(i) + " in test " + str(test_num) + " passed!" + str(expected_list[i]) + " matches " + str(actual_list[i]) + ".")
        else: 
            print("Part " + str(i) + " in test " + str(test_num) + " failed. Expected:" + str(expected_list[i]) + ". Got: " + str(actual_list[i]) + ".")

# Test for the integer_manipulator function
def testint(test_num, expected, actual):
    if expected == actual:
        print("Test " + str(test_num) + " passed!" + str(expected) + " matches " + str(actual) + ".")
    else: 
        print("Test " + str(test_num) + " failed. Expected:" + str(expected) + ". Got: " + str(actual) + ".")

# Test for the manipulate_list function
def testintlist(test_num, expected_list, actual_list):
    print("Test " + str(test_num) + ": ")
    for i in range(0, len(expected_list)):
        if expected_list[i] == actual_list[i]:
            print("Part " + str(i) + " in test " + str(test_num) + " passed!" + str(expected_list[i]) + " matches " + str(actual_list[i]) + ".")
        else: 
            print("Part " + str(i) + " in test " + str(test_num) + " failed. Expected:" + str(expected_list[i]) + ". Got: " + str(actual_list[i]) + ".")


# Print out the tests
print("\nString Capitalizer Tests:")
# test_string is the function for testing the string capitalizer and takes 
# three arguments: test number (“0”), expected output value (“TwO”), and
# the call to the string_capitalizer function with the argument “two”.
teststring("0", "TwO", utsc.string_capitalizer("two"))
teststring("1", "C", utsc.string_capitalizer("c"))
teststring("2", "FouR", utsc.string_capitalizer(4))
teststring("3", "", utsc.string_capitalizer(""))

print("\nList Capitalizer Tests:")
teststrlist("0", ["TwO","C","FouR",""], utsc.capitalize_list(["two","c",4,""]))

print("\nInteger Manipulator Tests:")
testint("0", 66, utsc.integer_manipulator(10))
testint("1", 2, utsc.integer_manipulator(2))
testint("2", 6, utsc.integer_manipulator(3))
testint("3", 0, utsc.integer_manipulator(0))
testint("4", 1, utsc.integer_manipulator("three"))

print("\nManipulate List Tests:")
testintlist("0", [66,2,6,0,1], utsc.manipulate_list([10,2,3,0,"three"]))