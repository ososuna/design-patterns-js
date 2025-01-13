/**
* How to implement Factory?
* 1. Declare base product class/interface, this will be the
*  factory class and their sub classes.
* 2. Implement concrete products sub classes that inherit
*  the base product class/interface. 
* 3. Declare factory class/interface that returns object of
*  the base product class/interface.
* 4. Implement concrete factories sub classes that inherit
*  the base factory class/interface. These classes will return
*  products in their factory method.
*/

// Step 1
interface BaseCar {
  showCost(): void;
}

// Step 2
class MastodonCar implements BaseCar {
  showCost(): void {
    console.log('Mastodon car cost is $100,000');
  }
}

class RhinoCar implements BaseCar {
  showCost(): void {
    console.log('Rhino car cost is $50,000');
  }
}

// Step 3
interface CarFactory {
  makeCar(): BaseCar;
}

// Step 4
class MastodonCarFactory implements CarFactory {
  makeCar(): BaseCar { // I prefer to depend on BaseCar abstraction instead of MastodonCar concrete class
    return new MastodonCar();
  }
}

class RhinoCarFactory implements CarFactory {
  makeCar(): BaseCar { // I prefer to depend on BaseCar abstraction instead of RhinoCar concrete class
    return new RhinoCar();
  }
}

// Usage
function appFactory(factory: CarFactory) {
  const car: BaseCar = factory.makeCar();
  car.showCost();
}

/**
 * We could change the the Factory as you wish since
 * all of them implement the same behavior.
*/
appFactory(new MastodonCarFactory());
appFactory(new RhinoCarFactory());

/**
 * Let's abstract the factories creation
 * @param type Type of car factory
 * @returns A car factory instance based
 */
type FactoryType = 'mastodon' | 'rhino';
function createFactory(type: FactoryType) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory
  };
  const factoryClass = factories[type];
  return new factoryClass();
}

/**
* Instead of using new() operator, we abstract the
* factories creation and we just indicate the type
*/
appFactory(createFactory('mastodon'));
appFactory(createFactory('rhino'));

export {};