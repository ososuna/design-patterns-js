/**
 * How to implement Abstract Factory?
 * 
 * 1. Declare base products classes/interfaces for each product
 * in the catalog
 * 
 * Products interfaces:
 * - Mastodon Car
 * - Rhino Car
 * 
 * 2. Implement concrete products classes that inherits/implements
 * base products classes/interfaces, for each of the family types.
 * 
 * Concrete Products:
 * - MastodonSedanCar
 * - RhinoSedanCar
 * - MastodonHatchbackCar
 * - RhinoHatchbackCar
 * 
 * 3. Declare abstract factory class/interface that declare creation
 * methods for each base product.
 * 
 * Abstract Factory:
 * - CarFactory
 *    - createMastodonCar(): Mastodon
 *    - createRhinoCar(): Rhino
 * 
 * 4. Create concrete factories that implements the all of the defined
 * creation methods in the abstract factory.
 * - SedanCarFactory
 * - HatchbackCarFactory
 * 
 */

// Step 1
interface Mastodon {
  useGps(): void;
}

interface Rhino {
  useGps(): void;
}

// Step 2
class MastodonSedanCar implements Mastodon {
  useGps(): void {
    console.log('[Sedan] Mastodon GPS');
  }
}

class MastodonHatchbackCar implements Mastodon {
  useGps(): void {
    console.log('[Hatchback] Mastodon GPS');
  }
}

class RhinoSedanCar implements Rhino {
  useGps(): void {
    console.log('[Sedan] Rhino GPS');
  }
}

class RhinoHatchbackCar implements Rhino {
  useGps(): void {
    console.log('[Hatchback] Rhino GPS');
  }
}

// Step 3
interface AbstractCarFactory {
  createMastodon(): Mastodon;
  createRhino(): Rhino;
}

// Step 4
class SedanCarFactory implements AbstractCarFactory {
  createMastodon(): Mastodon {
    return new MastodonSedanCar();
  }
  createRhino(): Rhino {
    return new RhinoSedanCar();
  }
}

class HatchbackCarFactory implements AbstractCarFactory {
  createMastodon(): Mastodon {
    return new MastodonHatchbackCar();
  }
  createRhino(): Rhino {
    return new RhinoHatchbackCar();
  }
}

function appCarFactory(factory: AbstractCarFactory) {
  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }
  const mastodon: Mastodon = factory.createMastodon();
  const rhino: Rhino = factory.createRhino();
  mastodon.useGps();
  rhino.useGps();
}

type FactoryType = 'sedan' | 'hatchback';

const createFactory = (type: FactoryType) => {
  const factory = {
    sedan: SedanCarFactory,
    hatchback: HatchbackCarFactory
  };
  const Factory = factory[type];
  return new Factory();
}

appCarFactory(createFactory('hatchback'));
appCarFactory(createFactory('sedan'));

export {};