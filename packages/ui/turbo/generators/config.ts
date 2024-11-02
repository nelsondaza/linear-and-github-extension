import type { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('ui:rc', {
    actions: [
      {
        path: 'src/components/{{pascalCase name}}/index.tsx',
        skipIfExists: true,
        templateFile: 'templates/component.hbs',
        type: 'add',
      },
      {
        path: 'src/components/{{pascalCase name}}/index.stories.tsx',
        skipIfExists: true,
        templateFile: 'templates/stories.hbs',
        type: 'add',
      },
      {
        path: 'src/index.ts',
        template: "export * from './components/{{pascalCase name}}'",
        type: 'append',
        unique: true,
      },
    ],
    description: 'Adds a new react component',
    prompts: [
      {
        message: "New component's name:",
        name: 'name',
        type: 'input',
        validate: (input: string) => {
          if (input.includes('.')) {
            return 'Name cannot include an extension'
          }
          if (input.includes(' ')) {
            return 'Name cannot include spaces'
          }
          if (!input) {
            return 'Name is required'
          }
          return true
        },
      },
    ],
  })
  plop.setGenerator('ui:rc:ref', {
    actions: [
      {
        path: 'src/components/{{pascalCase name}}/index.tsx',
        skipIfExists: true,
        templateFile: 'templates/component-ref.hbs',
        type: 'add',
      },
      {
        path: 'src/components/{{pascalCase name}}/index.stories.tsx',
        skipIfExists: true,
        templateFile: 'templates/stories.hbs',
        type: 'add',
      },
      {
        path: 'src/index.ts',
        template: "export * from './components/{{pascalCase name}}'",
        type: 'append',
        unique: true,
      },
    ],
    description: 'Adds a new react component with forwardRef',
    prompts: [
      {
        message: "New component's name:",
        name: 'name',
        type: 'input',
        validate: (input: string) => {
          if (input.includes('.')) {
            return 'Name cannot include an extension'
          }
          if (input.includes(' ')) {
            return 'Name cannot include spaces'
          }
          if (!input) {
            return 'Name is required'
          }
          return true
        },
      },
    ],
  })
}
