swapperctl
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/swapperctl.svg)](https://npmjs.org/package/swapperctl)
[![Downloads/week](https://img.shields.io/npm/dw/swapperctl.svg)](https://npmjs.org/package/swapperctl)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @swappableqm/swapperctl
$ swapperctl COMMAND
running command...
$ swapperctl (--version)
@swappableqm/swapperctl/0.0.1 linux-x64 node-v24.1.0
$ swapperctl --help [COMMAND]
USAGE
  $ swapperctl COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`swapperctl active`](#swapperctl-active)
* [`swapperctl active overview`](#swapperctl-active-overview)
* [`swapperctl active stop`](#swapperctl-active-stop)
* [`swapperctl active sync`](#swapperctl-active-sync)
* [`swapperctl help [COMMAND]`](#swapperctl-help-command)
* [`swapperctl qm`](#swapperctl-qm)
* [`swapperctl qm active`](#swapperctl-qm-active)
* [`swapperctl qm list`](#swapperctl-qm-list)
* [`swapperctl qm overview QMID`](#swapperctl-qm-overview-qmid)
* [`swapperctl qm swap QMID`](#swapperctl-qm-swap-qmid)

## `swapperctl active`

View the current active QM and its' status

```
USAGE
  $ swapperctl active [--json] [--api-secret <value>] [--api-url <value>]

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  View the current active QM and its' status

ALIASES
  $ swapperctl active overview
  $ swapperctl qm active

EXAMPLES
  $ swapperctl active
```

_See code: [src/commands/active/index.ts](https://github.com/swapperctl/swapperctl/blob/v0.0.1/src/commands/active/index.ts)_

## `swapperctl active overview`

View the current active QM and its' status

```
USAGE
  $ swapperctl active overview [--json] [--api-secret <value>] [--api-url <value>]

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  View the current active QM and its' status

ALIASES
  $ swapperctl active overview
  $ swapperctl qm active

EXAMPLES
  $ swapperctl active overview
```

## `swapperctl active stop`

Stop the active QM

```
USAGE
  $ swapperctl active stop [--json] [--api-secret <value>] [--api-url <value>]

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  Stop the active QM

EXAMPLES
  $ swapperctl active stop
```

_See code: [src/commands/active/stop.ts](https://github.com/swapperctl/swapperctl/blob/v0.0.1/src/commands/active/stop.ts)_

## `swapperctl active sync`

Sync devices to the active QM

```
USAGE
  $ swapperctl active sync [--json] [--api-secret <value>] [--api-url <value>]

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  Sync devices to the active QM

EXAMPLES
  $ swapperctl active sync
```

_See code: [src/commands/active/sync.ts](https://github.com/swapperctl/swapperctl/blob/v0.0.1/src/commands/active/sync.ts)_

## `swapperctl help [COMMAND]`

Display help for swapperctl.

```
USAGE
  $ swapperctl help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for swapperctl.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `swapperctl qm`

View list of all swappable QMs

```
USAGE
  $ swapperctl qm [--json] [--api-secret <value>] [--api-url <value>]

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  View list of all swappable QMs

ALIASES
  $ swapperctl qm list

EXAMPLES
  $ swapperctl qm
```

_See code: [src/commands/qm/index.ts](https://github.com/swapperctl/swapperctl/blob/v0.0.1/src/commands/qm/index.ts)_

## `swapperctl qm active`

View the current active QM and its' status

```
USAGE
  $ swapperctl qm active [--json] [--api-secret <value>] [--api-url <value>]

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  View the current active QM and its' status

ALIASES
  $ swapperctl active overview
  $ swapperctl qm active

EXAMPLES
  $ swapperctl qm active
```

## `swapperctl qm list`

View list of all swappable QMs

```
USAGE
  $ swapperctl qm list [--json] [--api-secret <value>] [--api-url <value>]

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  View list of all swappable QMs

ALIASES
  $ swapperctl qm list

EXAMPLES
  $ swapperctl qm list
```

## `swapperctl qm overview QMID`

View the current active QM and its' status

```
USAGE
  $ swapperctl qm overview QMID [--json] [--api-secret <value>] [--api-url <value>]

ARGUMENTS
  QMID  The ID of the QM to view

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  View the current active QM and its' status

ALIASES
  $ swapperctl qm overview

EXAMPLES
  $ swapperctl qm overview
```

_See code: [src/commands/qm/overview.ts](https://github.com/swapperctl/swapperctl/blob/v0.0.1/src/commands/qm/overview.ts)_

## `swapperctl qm swap QMID`

Swap the active QM

```
USAGE
  $ swapperctl qm swap QMID [--json] [--api-secret <value>] [--api-url <value>]

ARGUMENTS
  QMID  The ID of the QM to swap to

SWAPPER API FLAGS
  --api-secret=<value>  The API secret for the Swapper API server
  --api-url=<value>     The URL of the Swapper API server

OUTPUT FLAGS
  --json  Output in JSON format

DESCRIPTION
  Swap the active QM

ALIASES
  $ swapperctl qm swap

EXAMPLES
  $ swapperctl qm swap
```

_See code: [src/commands/qm/swap.ts](https://github.com/swapperctl/swapperctl/blob/v0.0.1/src/commands/qm/swap.ts)_
<!-- commandsstop -->
