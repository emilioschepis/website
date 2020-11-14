---
title: Adding continuous integration to a Flutter project with GitHub Actions
description: Setup a GitHub workflow to analyze, lint, and test a Flutter app on every commit.
tags: GitHub, Flutter, CI, continous integration, actions, test, Dart
date: "2020-11-14T00:00:00.000Z"
---
## Introduction

Whenever you start a new project, either by yourself or as part of a team, it is important to define a set of rules to adhere to and to select tools that can automate the process of detecting if and when those rules are broken.

One such tool is the recently-announced [GitHub Actions](https://github.com/features/actions).

In this post I will show you how to setup a workflow to analyze, lint and test your Flutter project.

## Getting started

A workflow is a set of steps that are executed whenever an event happens on your repository. Common triggers for these actions are pushes or pull requests on a given branch.

Workflows must be stored in the `.github/workflows/` directory in your project. A single workflow is defined by a YAML file that can be named however we want.

For more information about Actions I highly recommend going through the extensive [documentation](https://docs.github.com/en/free-pro-team@latest/actions).

A really nice feature of GitHub Actions is its generous free tier: you can run actions on Linux machines for up to 2000 minutes / month for free. If your project is open source (on a public repo), Actions are always free.

## Setting up a CI workflow for Flutter

### Step 1 - Setting up Pedantic on your project (Optional)

[Pedantic](https://pub.dev/packages/pedantic) is a Dart package created by Google that provides the extensive set of strict rules that Google itself uses in their projects.

You can add it as a development dependency to your `pubspec.yaml` file.
```yaml
dev_dependencies:
  pedantic: ^1.9.0 # check the latest version on the package's page
```

We can then define the set of rules that Pedantic applies adding a `analysis_options.yaml` to the root of our project.
To use Google's rules without overriding anything, the file is as straightforward as one line.
Since we will be analyzing the project in our CI environment, we will add three more lines.

```yaml
include: package:pedantic/analysis_options.1.9.0.yaml

analyzer:
  exclude:
    - flutter/** # Do not analyze the Flutter repository in the CI environment
```

This is needed because the GitHub Action will download a copy of the Flutter framework in the same directory of our project, making the Analysis step check the whole Flutter project, dramatically increasing the action duration.

### Step 2 - Setting up the CI workflow file

Create a new workflow file in the workflows directory. For example you might create `.github/workflows/ci.yaml`.

```yaml
name: CI

on:
  push:
    branches: [ main ]

jobs:
  workflow:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 # (1)
      - name: Setup Flutter # (2)
        run: |
          git clone https://github.com/flutter/flutter.git --depth 1
          echo "$GITHUB_WORKSPACE/flutter/bin" >> $GITHUB_PATH
      - name: Run Checks # (3)
        run: |
          flutter pub get
          flutter format lib/** --set-exit-if-changed
          flutter analyze --no-pub
          flutter test --no-pub
```

Let's go through this file point by point:

1. This Action, provided by GitHub, clones our project on the workflow machine

2. This step clones the latest commit of the Flutter framework on the workflow machine and sets the PATH so that we can use `flutter` commands
    * If you added Pedantic in Step 1, this is why we needed to exclude the flutter directory from the analysis

3. This step runs the actual checks on your code
    * Downloads all of your project's dependencies
    * Uses `dartfmt` to check your code's formatting (failing if it not properly formatted)
    * Analyzes it with Pedantic (highlighting broken rules)
    * Runs all tests (both unit tests and headless widget tests)

## Result

Every push on the `main` branch will now trigger this CI action, providing quick and precise feedback on possible problems in the codebase.
You can enhance this simple workflow with anything you might want to track (adding code coverage, build steps for each platform, and so on).

## Conclusion

Having an automated process that checks your project's health at every push can be invaluable, especially when paired with extensive tests.

I really hope this will prove useful in your Flutter project.

**Thank you for reading!**
