import Vue from 'vue';

var script = {
	props: {
		link: {
			type: String,
			default: null
		},
		color: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: 'default'
		},
		icon: {
			type: String,
			default: null
		}
	},
	data: function () { return ({
		buttonType: 'button',
		buttonColor: 'default'
	}); },
	created: function created() {
		var isLink = new RegExp('^(http://|https://|tel:|mailto:)');
		// Determine type of link
		if (this.$props && this.$props.link && this.$props.link.match(isLink)) { this.buttonType = 'a'; }
		else if (this.$props && this.$props.link) { this.buttonType = 'router-link'; }
		else { this.buttonType = 'button'; }

		// Set the color
		if (this.$props && this.$props.color) { this.buttonColor = this.$props.color; }
	},
	methods: {
		buttonClasses: function buttonClasses() {
			return [
				'button',
				this.$props.color ? ("button--" + (this.$props.color)) : null,
				this.$props.type ? ("button--" + (this.$props.type)) : null,
				this.$props.icon ? "button--icon" : null
			];
		}
	},

	render: function(h) {
		// If the link is a nuxt link, render will build it up with the NuxtLink component.
		if (this.buttonType == 'router-link') {
			return h(
				Vue.component('RouterLink'),
				{
					props: {
						to: this.$props.link
					},
					class: this.buttonClasses()
				},
			[
					h('span', { class: ['button__text'] }, this.$slots.default),
					this.$props.icon
						? h('span', { class: ['button__icon'] }, [h('span', { class: [("icon--" + (this.$props.icon))] })])
						: null
				]
			);
		} else {
			// Otherwise it will be an 'a' or a button. these can just be passed regularly to the render.
			return h(
				this.buttonType,
				{
					attrs: {
						href: this.buttonType == 'a' ? this.$props.link : null
					},
					class: this.buttonClasses()
				},
				[
					h('span', { class: ['button__text'] }, this.$slots.default),
					this.$props.icon
						? h('span', { class: ['button__icon'] }, [h('span', { class: [("icon--" + (this.$props.icon))] })])
						: null
				]
			);
		}
	}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;

/* template */

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var buttonLink = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	
	Vue.component('buttonLink', buttonLink);	
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default buttonLink;
export { install };
