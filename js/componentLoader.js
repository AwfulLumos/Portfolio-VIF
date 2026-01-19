/**
 * VIF.Dev Portfolio - Component Loader
 * Loads HTML components dynamically for modular architecture
 */

class ComponentLoader {
  constructor() {
    this.componentsPath = 'components/';
    this.loadedComponents = new Map();
  }

  /**
   * Load a single component into a target element
   * @param {string} componentName - Name of the component file (without .html)
   * @param {string|Element} target - Target element or selector
   * @returns {Promise<boolean>}
   */
  async loadComponent(componentName, target) {
    try {
      const targetElement = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;

      if (!targetElement) {
        console.warn(`Target element not found for component: ${componentName}`);
        return false;
      }

      const response = await fetch(`${this.componentsPath}${componentName}.html`);
      
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }

      const html = await response.text();
      targetElement.innerHTML = html;
      
      this.loadedComponents.set(componentName, targetElement);
      
      // Dispatch custom event for component load
      document.dispatchEvent(new CustomEvent('componentLoaded', {
        detail: { componentName, element: targetElement }
      }));

      return true;
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
      return false;
    }
  }

  /**
   * Load multiple components in sequence
   * @param {Array<{name: string, target: string}>} components 
   * @returns {Promise<boolean>}
   */
  async loadComponents(components) {
    const results = [];
    
    for (const { name, target } of components) {
      const result = await this.loadComponent(name, target);
      results.push(result);
    }

    // Dispatch event when all components are loaded
    document.dispatchEvent(new CustomEvent('allComponentsLoaded', {
      detail: { components: this.loadedComponents }
    }));

    return results.every(Boolean);
  }

  /**
   * Check if a component is loaded
   * @param {string} componentName 
   * @returns {boolean}
   */
  isLoaded(componentName) {
    return this.loadedComponents.has(componentName);
  }

  /**
   * Get loaded component element
   * @param {string} componentName 
   * @returns {Element|undefined}
   */
  getComponent(componentName) {
    return this.loadedComponents.get(componentName);
  }
}

// Create global instance
window.componentLoader = new ComponentLoader();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComponentLoader;
}
