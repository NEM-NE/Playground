class Student:
    def __init__(self, name, grade) -> None:
        self.name = name;
        self.grade = grade;
    
    def to_string(self) -> str:
        return f"my name is {self.name} and my grade is {self.grade}";