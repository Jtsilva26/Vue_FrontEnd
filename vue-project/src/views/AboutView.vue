<template>
  <div class="bg-gray-900">

    <main class="relative isolate">
      <!-- Background -->
      <div class="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
        <div class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
      </div>

      <!-- Header section -->
      <div class="px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">We love investors</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">Fueling innovation and empowering growth, turning ideas into reality. Your support helps us build a brighter future for everyone involved!</p>
        </div>
      </div>

      <!-- Content section -->
      <div class="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
            <div>
              <p>We are a newly established firm dedicated to revolutionizing land holding investments.
                As an owner, you have the unique opportunity to invest in valuable land holdings, creating a sustainable
                future for yourself and your community.</p>
              <p class="mt-8">Joining us means becoming a part of a visionary team focused on providing innovative solutions in the real
                estate sector. We believe that investing in land is not just a financial decision; it’s a commitment to
                nurturing growth and building a legacy.</p>
            </div>
            <div>
              <p>Our company is built on principles of transparency, integrity, and collaboration. We work closely with our
                owners to ensure that every investment aligns with their goals and aspirations. Together, we can unlock
                the potential of land holdings and create opportunities for all stakeholders involved.</p>
              <p class="mt-8">Whether you're an experienced investor or new to the world of land holdings, our team is here to guide you
                every step of the way. Join us today, and let's embark on this exciting journey together!</p>
            </div>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
            <div v-for="(stat, statIdx) in stats" :key="statIdx" class="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
              <dt class="text-base leading-7 text-gray-300">{{ stat.label }}</dt>
              <dd class="text-3xl font-semibold tracking-tight text-white">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Image section -->
      <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80" alt="" class="aspect-[9/4] w-full object-cover xl:rounded-3xl" />
      </div>

      <!-- Values section -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our values</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300"> Dedicated to keeping Americans employed while strategically building investors' portfolios.</p>
        </div>
        <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          <div v-for="value in values" :key="value.name" class="relative pl-9">
            <dt class="inline font-semibold text-white">
              <component :is="value.icon" class="absolute left-1 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
              {{ value.name }}
            </dt>
            {{ ' ' }}
            <dd class="inline">{{ value.description }}</dd>
          </div>
        </dl>
      </div>

      <!-- Team section -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our team</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">The team that turns the impossible into reality.</p>
        </div>
        <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          <li v-for="person in team" :key="person.name">
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" :src="person.imageUrl" alt="" />
            <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{{ person.name }}</h3>
            <p class="text-base leading-7 text-gray-300">{{ person.role }}</p>
            <p class="text-sm leading-6 text-gray-500">{{ person.location }}</p>
          </li>
        </ul>
      </div>

      <!-- CTA section -->
      <div class="relative isolate -z-10 mt-32 sm:mt-40">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <img class="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm" src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="" />
            <div class="w-full flex-auto">
              <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Join our team</h2>
              <p class="mt-6 text-lg leading-8 text-gray-300">We offer top of the line postions with the promise for growth</p>
              <ul role="list" class="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2">
                <li v-for="benefit in benefits" :key="benefit" class="flex gap-x-3">
                  <CheckCircleIcon class="h-7 w-5 flex-none" aria-hidden="true" />
                  {{ benefit }}
                </li>
              </ul>
              <div class="mt-10 flex">
                <RouterLink to="/signin" class="text-sm font-semibold leading-6 text-indigo-400">Join our journey <span aria-hidden="true">&rarr;</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
          <div class="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative mt-32 sm:mt-40" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8">
            <p class="text-sm leading-6 text-gray-300">Check out some of our socials</p>
            <div class="flex space-x-6">
              <a v-for="item in footerNavigation.social" :key="item.name" :href="item.href" class="text-gray-500 hover:text-gray-400">
                <span class="sr-only">{{ item.name }}</span>
                <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">Solutions</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.solutions" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.support" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.company" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.legal" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p class="text-xs leading-5 text-gray-400">&copy; 2024 Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { defineComponent, h, ref } from 'vue';
import { RouterLink } from 'vue-router';

import {
  AcademicCapIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
} from '@heroicons/vue/20/solid'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
const stats = [
  { label: 'Business was founded', value: '2020' },
  { label: 'People on the team', value: '120+' },
  { label: 'Users on the platform', value: '50k' },
  { label: 'Paid out to investors', value: '$70M' },
]
const values = [
  {
    name: 'Be world-class.',
    description: 'Strive for excellence in every endeavor, setting high standards and continuously pushing the boundaries of what’s possible.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Take responsibility.',
    description: 'Embrace accountability by owning your actions and their impact on others.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Be supportive.',
    description: 'Foster a positive environment by uplifting others and encouraging their growth and success.',
    icon: UserGroupIcon,
  },
  {
    name: 'Always learning.',
    description: 'Embrace a mindset of curiosity and growth, continuously seeking knowledge and experiences to enhance your skills and understanding.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Share everything you know.',
    description: 'Generously share your knowledge and insights to empower others, fostering a culture of collaboration and collective growth.',
    icon: SparklesIcon,
  },
  {
    name: 'Enjoy downtime.',
    description: 'Value your downtime as an essential opportunity to recharge and reflect, allowing for greater creativity and productivity.',
    icon: SunIcon,
  },
]
const team = [
{
    name: 'Kris Woods',
    role: 'Chief Technology Officer (CTO)',
    imageUrl: 'https://ca.slack-edge.com/TJPAXTSBS-ULVFGM9TL-e7df80d557e6-512',
    location: 'Irvine, California',
  },
  {
    name: 'Kristian Fulkerson',
    role: 'Software Engineer',
    imageUrl: 'https://ca.slack-edge.com/TJPAXTSBS-U03L61C8023-d86ebcf6aa5f-512',
    location: 'Irvine, California',
  },
  {
    name: 'Brandon Papin',
    role: 'Software Engineer',
    imageUrl: 'https://ca.slack-edge.com/TJPAXTSBS-U02RFRELB08-aada97af0168-512',
    location: 'Irvine, California',
  },
  {
    name: 'Kamary Gillespie',
    role: 'Jr. Software Engineer',
    imageUrl: 'https://ca.slack-edge.com/TJPAXTSBS-U056701A5HS-ab3396f287b5-512',
    location: 'Irvine, California',
  },
  {
    name: 'Ed Saenz',
    role: 'Jr. Software Engineer',
    imageUrl: 'https://ca.slack-edge.com/TJPAXTSBS-U0593CDUB6K-4aee21b04288-512',
    location: 'Irvine, California',
  },
  {
    name: 'Jordan Silva',
    role: 'Jr. Software Engineer',
    imageUrl:
      'https://ca.slack-edge.com/TJPAXTSBS-U07LWKPTK6G-e63b595251a4-512',
    location: 'Bakersfield, California',
  },
  {
    name: 'Giovanni',
    role: 'Jr. Software Engineer',
    imageUrl:
      'https://ca.slack-edge.com/TJPAXTSBS-U07LU1C1D51-040097678979-512',
    location: 'Irvine, California',
  },
  {
    name: 'Alex Garbero',
    role: ' Jr. Software Engineer',
    imageUrl: 'https://ca.slack-edge.com/TJPAXTSBS-U07PH6KV0KG-92b2d0a286e2-512',
    location: 'Irvine, California',
  },
]
const benefits = [
  'Competitive salaries',
  'Flexible work hours',
  '30 days of paid vacation',
  'Annual team retreats',
  'Benefits for you and your family',
  'A great work environment',
]
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'X',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              d: 'M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z',
            }),
          ]),
      }),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
  ],
}

const mobileMenuOpen = ref(false)
</script>
