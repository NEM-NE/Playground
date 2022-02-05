package Thread;

import java.util.ArrayList;

/*

    쓰레드가 동기화된 자원을 오랫동안 가지고 있으면 다른 쓰레드가 접근 할 수 없어 계속 기다려야함.
    그래서 wait()를 통해 동기화된 자원을 반납하고 notify()를 통해 다시 락을 받는다.

 */

class Customer implements Runnable {
    private Table table;
    private String food;

    Customer(Table table, String food){
        this.table = table;
        this.food = food;
    }

    @Override
    public void run(){
        while(true) {
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {}

            String name = Thread.currentThread().getName();

            table.remove(food);
            System.out.println(name + " ate a " + this.food);

        }
    }

}

class Cook implements Runnable {
    private Table table;

    Cook(Table table){
        this.table = table;
    }

    @Override
    public void run(){
        while (true){
            int idx = (int)(Math.random() * table.dishNum());
            table.add(table.dishNames[idx]);

            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {}
        }
    }
}

class Table {
    String[] dishNames = {"donut", "donut", "burger"};
    final int MAX_FOOD = 6;

    private ArrayList<String> dishes = new ArrayList<String>();

    public synchronized void add(String dish){
        while(dishes.size() >= MAX_FOOD){
            String name = Thread.currentThread().getName();
            System.out.println(name + " is waiting. ");
            try {
                wait();
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        dishes.add(dish);
        notify();
        System.out.println("DISHES: " + dishes.toString());
    }

    public void remove(String dish){
        synchronized (this) {
            String name = Thread.currentThread().getName();
            while(dishes.size() == 0) {
                System.out.println(name + " is waiting... ");
                try {
                    wait();
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            while(true) {
                for(int i = 0; i < dishes.size(); i++){
                    if(dish.equals(dishes.get(i))){
                        dishes.remove(i);
                        notify();
                        return;
                    }
                }

                try {
                    System.out.println(name + " is waiting... ");
                    wait();
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public int dishNum() {
        return dishNames.length;
    }
}

public class ThreadWait {
    public static void main(String[] args) {
        Table table = new Table();

        new Thread(new Cook(table), "COOK1").start();
        new Thread(new Customer(table, "donut"), "CUS1").start();
        new Thread(new Customer(table, "burger"), "CUS2").start();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {}
        System.exit(0);
    }
}
