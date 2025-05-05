declare module 'sal.js' {
    interface SalOptions {
      /** 
       * Percentage of element's height that needs to be visible to trigger animation
       * @default 0.5
       */
      threshold?: number;
      
      /** 
       * Whether animation should happen only once
       * @default false
       */
      once?: boolean;
      
      /** 
       * Disable animations
       * @default false
       */
      disable?: boolean;
      
      /** 
       * Selector of the elements to be animated
       * @default '[data-sal]'
       */
      selector?: string;
      
      /** 
       * Class name which triggers animation
       * @default 'sal-animate'
       */
      animateClassName?: string;
      
      /** 
       * Class name which defines the disabled state
       * @default 'sal-disabled'
       */
      disabledClassName?: string;
      
      /** 
       * Root element used as viewport for checking visibility
       * @default null (browser viewport)
       */
      root?: HTMLElement | null;
      
      /** 
       * Custom event name when element enters viewport
       * @default 'sal:in'
       */
      enterEventName?: string;
      
      /** 
       * Custom event name when element exits viewport
       * @default 'sal:out'
       */
      exitEventName?: string;
    }
  
    interface SalInstance {
      /** Collection of observed elements */
      elements: {
        /** List of DOM nodes being observed */
        nodes: NodeListOf<HTMLElement>;
        /** Array of elements with their state */
        items: Array<{
          node: HTMLElement;
          isIntersecting: boolean;
        }>;
      };
      
      /** Enable sal.js */
      enable: () => void;
      
      /** Disable sal.js */
      disable: () => void;
      
      /** Reset all elements to their initial state */
      reset: () => void;
    }
  
    /**
     * Initialize scroll animation library
     * @param options Configuration options
     * @returns Sal instance with control methods
     */
    function sal(options?: SalOptions): SalInstance;
  
    export = sal;
  }