package Thread;

/*

    공유하는 객체나 객체의 속성은 반드시 private으로 감싸줄 것.

 */

public class ThreadEx22 {
    public static void main(String[] args) {
        Runnable r = new MyRunnable();
        Thread t1 = new Thread(r);
        Thread t2 = new Thread(r);

        t1.start();
        t2.start();
    }

    static class Account {
        private int balance = 1000;

        public int getBalance() {
            return this.balance;
        }

        public synchronized void withdraw(int money) {
            if(balance >= money){
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {}
                balance -= money;
            }
        }
    }

    static class MyRunnable implements Runnable {
        Account account = new Account();
        @Override
        public void run() {
            while(account.getBalance() > 0) {
                int money = (int) (Math.random() * 10) * 20;
                System.out.println("will withdraw : " + money + " by " + Thread.currentThread().getName());
                account.withdraw(money);
                System.out.println("balance: " + account.getBalance() + " by " + Thread.currentThread().getName());
            }
        }
    }
}
