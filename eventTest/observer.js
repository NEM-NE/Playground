const EventEmitter = require('events');

class TrackingService {
    track(user) {

    }
}

class EmailService {
    sendEmail(user){

    }
}

class SignUpService {

    constructor(){
        this.emailService = new EmailService();
        this.trackingService = new TrackingService();
    }

    signUp(name, nickname){
        const user = {
            name, nickname
        }

        this.emailService.sendEmail(user);
        this.trackingService.track(user);
    }

}

class EmitterSubject { 
    constructor(){
        this.emitters = [];
    }

    add(emitter){
        this.emitters.push(emitter);
    }

    emitAll(){
        this.emitters.forEach((emitter) =>{
            emitter.emit('user_signup');
        })
    }
}