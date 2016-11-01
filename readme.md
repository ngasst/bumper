# Bumper
Bumber is a tool meant to take away the pain repetitive task of bumping versions on npm modules.
Following semver, bumper helps with incrementing patch, minor, or major versions with a simple set of commands.
In addition, bumper integrates with git to commit changes, but that feature is in no way mandatory. 
Similarly, Bumper can integrate with npm to publish packages after they are bumped to the next version.

## Installation
Bumper is installed with npm or yarn.

### Global Install
    npm install -g bumper // yarn add bumper -g

### Local Install
    npm install --save-dev bumper // yarn add bumper --dev

## Usage

However you choose to go about installing bumper, its usage is exactly the same in both cases, minus the longer path for local installations, which can be mitigated with an npm script.

### Various ways to use bumper

    bump
That command alone will bump the *patch* version only and will not commit changes or publish to the npm registry.

    bump [version-tag]
That command will bump the specified tag (patch, minor, or major) but will *NOT* do anything else. Not commit, no publish.

    bump [version-tag] --git
That command will bump the specified version and will commit changes. A wizard will walk you through the options, or you can accept the defaults.

    bump [version-tag] --npm
That command will bump the specified tag and will publish the new package version to the npm registry. CAUTION: the --npm flag alone does not touch your GIT repo.

    bump [version-tag] --git --npm
Unsurprisingly, this command commits the chosen files to the git repo *AND* publishes the new package version to the npm registry.

## Caveats
There are a few things to take into consideration before using this module.
* No testing has been put into this module. If required this may be remedied to, but that is something to be aware of.

## TODO:
* Comment code.
* Refactor where necessary.