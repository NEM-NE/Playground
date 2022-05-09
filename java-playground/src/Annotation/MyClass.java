package Annotation;

import java.lang.reflect.Method;

public class MyClass {
    public static void main(String[] args) {
        Method[] methods = TestClass.class.getMethods();

        for(Method method : methods){
            if(method.isAnnotationPresent(MyAnnotation.class)){
                MyAnnotation annotation = method.getDeclaredAnnotation(MyAnnotation.class);
                String val = annotation.value();
                System.out.println(val);
            }
        }
    }
}

class TestClass {
    @MyAnnotation("WTF")
    public void sayHello(){
        System.out.println("hoi");
    }

    @MyAnnotation("kimchi")
    public void sayBye(){
        System.out.println("bye");
    }
}
