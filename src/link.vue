<script>
import Vue from 'vue';
export default {
	props: {
		link: {
			type: String,
			default: null
		},
		color: {
			type: String,
			default: null
		},
		model: {
			type: String,
			default: 'default'
		},
		icon: {
			type: String,
			default: null
		}
	},
	data: () => ({
		buttonType: 'button',
		buttonColor: 'default'
	}),
	created() {
		const isLink = new RegExp('^(http://|https://|tel:|mailto:)');
		// Determine type of link
		if (this.$props && this.$props.link && this.$props.link.match(isLink)) this.buttonType = 'a';
		else if (this.$props && this.$props.link) this.buttonType = 'router-link';
		else this.buttonType = 'button';

		// Set the color
		if (this.$props && this.$props.color) this.buttonColor = this.$props.color;
	},
	methods: {
		buttonClasses() {
			return [
				'button',
				this.$props.color ? `button--${this.$props.color}` : null,
				this.$props.model ? `button--${this.$props.model}` : null,
				this.$props.icon ? `button--icon` : null
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
						? h('span', { class: ['button__icon'] }, [h('span', { class: [`icon--${this.$props.icon}`] })])
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
						? h('span', { class: ['button__icon'] }, [h('span', { class: [`icon--${this.$props.icon}`] })])
						: null
				]
			);
		}
	}
};
</script>
