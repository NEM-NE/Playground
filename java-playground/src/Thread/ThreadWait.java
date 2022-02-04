package Thread;

import java.util.ArrayList;

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

            if(eatFood(this.food)){
                System.out.println(name + " ate a " + this.food);
            }else {
                System.out.println(name + " can't eat a " + this.food);
            }

        }
    }

    boolean eatFood(String dish) {
        return this.table.remove(dish);
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
                Thread.sleep(1);
            } catch (InterruptedException e) {}
        }
    }
}

class Table {
    String[] dishNames = {"donut", "donut", "burger"};
    final int MAX_FOOD = 6;

    private ArrayList<String> dishes = new ArrayList<String>();

    public void add(String dish){
        if(dishes.size() >= MAX_FOOD) return;
        dishes.add(dish);
        System.out.println("DISHES: " + dishes.toString());
    }

    public boolean remove(String dish){
        for(int i = 0; i < dishes.size(); i++){
            if(dish.equals(dishes.get(i))){
                dishes.remove(i);
                return true;
            }
        }
        return false;
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
            Thread.sleep(100);
        } catch (InterruptedException e) {}
        System.exit(0);
    }
}
