var body = new Component();
body.container = document.body;

var wheelRight = new Wheel(90, 90);
wheelRight.setLocation(800, 380);
body.add(wheelRight);

var wheelLeft = new Wheel(90, 90);
wheelLeft.setLocation(580, 380);
body.add(wheelLeft);

var carBody = new CarBody(350, 210, "red");
carBody.setLocation(540, 220);
body.add(carBody);

var carFront = new CarFront(100, 110, "red");
carFront.setLocation(880, 320);
body.add(carFront);

var spareWheel = new SpareWheel(40, 130);
spareWheel.setLocation(500, 260);
body.add(spareWheel);

var car = new Car(380, 210, "purple");
car.setLocation(10, 20);
body.add(car);

var carTwo = new Car(110, 60, "orange");
car.setLocation(10, 100);
body.add(carTwo);
