import { RuleTester } from 'eslint';
import rule from '../../src/rules/attribute-hyphenation';

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('attribute-hyphenation', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '',
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(data-id="foo", aria-test="bar", slot-scope="{ data }", my-prop="prop")</template>',
      options: ['always'],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(data-id="foo" aria-test="bar" slot-scope="{ data }" myProp="prop")</template>',
      options: ['never'],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div(data-id="foo" aria-test="bar" slot-scope="{ data }"): a(onClick="" my-prop="prop")</template>',
      options: ['never'],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">custom(data-id="foo" aria-test="bar" slot-scope="{ data }" custom-hyphen="foo" second-custom="bar"): a(onClick="" my-prop="prop")</template>',
      options: ['never', { ignore: ['custom-hyphen', 'second-custom'] }],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">my-component(:[fooBar])</template>',
      options: ['always'],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">my-component(:[foo-bar])</template>',
      options: ['never'],
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(my-prop="foo")</template>',
      output: '<template lang="pug">div: custom(myProp="foo")</template>',
      options: ['never'],
      errors: [
        {
          message: "Attribute 'my-prop' can't be hyphenated.",
          type: 'VIdentifier',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(MyProp="Bar")</template>',
      output: '<template lang="pug">div: custom(my-prop="Bar")</template>',
      options: ['always'],
      errors: [
        {
          message: "Attribute 'MyProp' must be hyphenated.",
          type: 'VIdentifier',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(:my-prop="prop")</template>',
      output: '<template lang="pug">div: custom(:myProp="prop")</template>',
      options: ['never'],
      errors: [
        {
          message: "Attribute ':my-prop' can't be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(:MyProp="prop")</template>',
      output: '<template lang="pug">div: custom(:my-prop="prop")</template>',
      options: ['always'],
      errors: [
        {
          message: "Attribute ':MyProp' must be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(v-bind:my-prop="prop")</template>',
      output:
        '<template lang="pug">div: custom(v-bind:myProp="prop")</template>',
      options: ['never'],
      errors: [
        {
          message: "Attribute 'v-bind:my-prop' can't be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(v-bind:MyProp="prop")</template>',
      output:
        '<template lang="pug">div: custom(v-bind:my-prop="prop")</template>',
      options: ['always'],
      errors: [
        {
          message: "Attribute 'v-bind:MyProp' must be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(v-bind:MyProp="prop")</template>',
      output:
        '<template lang="pug">div: custom(v-bind:my-prop="prop")</template>',
      options: ['always', { ignore: [] }],
      errors: [
        {
          message: "Attribute 'v-bind:MyProp' must be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(v-bind:my-prop="prop" :second-prop="test")</template>',
      output:
        '<template lang="pug">div: custom(v-bind:my-prop="prop" :secondProp="test")</template>',
      options: ['never', { ignore: ['my-prop'] }],
      errors: [
        {
          message: "Attribute ':second-prop' can't be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(v-bind:myProp="prop" :secondProp="test")</template>',
      output:
        '<template lang="pug">div: custom(v-bind:my-prop="prop" :secondProp="test")</template>',
      options: ['always', { ignore: ['secondProp'] }],
      errors: [
        {
          message: "Attribute 'v-bind:myProp' must be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div: custom(v-bind:propID="prop" :secondPropID="test")</template>',
      output:
        '<template lang="pug">div: custom(v-bind:prop-i-d="prop" :secondPropID="test")</template>',
      options: ['always', { ignore: ['secondPropID'] }],
      errors: [
        {
          message: "Attribute 'v-bind:propID' must be hyphenated.",
          type: 'VDirectiveKey',
          line: 1,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
custom(data-id="foo" aria-test="bar" slot-scope="{ data }" custom-hyphen="foo" second-custom="baz" third-custom="bar")
  a(onClick="" my-prop="prop")
</template>`,
      output: `<template lang="pug">
custom(data-id="foo" aria-test="bar" slot-scope="{ data }" custom-hyphen="foo" second-custom="baz" thirdCustom="bar")
  a(onClick="" my-prop="prop")
</template>`,
      options: ['never', { ignore: ['custom-hyphen', 'second-custom'] }],
      errors: [
        {
          message: "Attribute 'third-custom' can't be hyphenated.",
          type: 'VIdentifier',
          line: 2,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
custom(data-id="foo" aria-test="bar" slot-scope="{ data }" custom-hyphen="foo" second-custom="baz" thirdCustom="bar")
  a(onClick="" my-prop="prop")
</template>`,
      output: `<template lang="pug">
custom(data-id="foo" aria-test="bar" slot-scope="{ data }" customHyphen="foo" secondCustom="baz" thirdCustom="bar")
  a(onClick="" my-prop="prop")
</template>`,
      options: ['never'],
      errors: [
        {
          message: "Attribute 'custom-hyphen' can't be hyphenated.",
          type: 'VIdentifier',
          line: 2,
        },
        {
          message: "Attribute 'second-custom' can't be hyphenated.",
          type: 'VIdentifier',
          line: 2,
        },
      ],
    },
  ],
});