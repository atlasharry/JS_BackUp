# import the unit_testing_sample_code module
import unit_testing_sample_code as utsc
import pytest

# Test for the srting_capitalizer functions
def test_string_1():
    assert "TwO" == utsc.string_capitalizer("two")

def test_string_2():
    assert "C" == utsc.string_capitalizer("c")

def test_string_3():
    assert "FouR" == utsc.string_capitalizer('four')

def test_string_4():
    assert "" == utsc.string_capitalizer("")

# Test for the capitalize_list function
def test_str_list_1():
    assert ["TwO","C","FouR",""] == utsc.capitalize_list(["two","c","4",""])

# Test for the integer_manipulator function
def test_int_1():
    assert 66 == utsc.integer_manipulator(10)

def test_int_2():
    assert 2 == utsc.integer_manipulator(2)

def test_int_3():
    assert 6 == utsc.integer_manipulator(3)

def test_int_4():
    assert 0 == utsc.integer_manipulator(0)

# Test for the manipulate_list function
def test_int_list_2():
    assert [66,2,6,0,0] == utsc.manipulate_list([10,2,3,0,1])