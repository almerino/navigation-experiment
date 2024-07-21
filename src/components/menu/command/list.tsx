import {
  ClusterOutlined,
  FunctionOutlined,
  KeyOutlined,
} from "@ant-design/icons"

import { CommandList } from "../../types"

export const commandList: CommandList = [
  {
    id: "group-x",
    label: "Tools",
    commands: [
      {
        id: "command-1",
        title: "apikeys create",
        tags: ["name"],
        description: "Create an API with a given name.",
        command: "create apikey(name)",
        icon: <KeyOutlined />,
      },
      {
        id: "command-2",
        title: "sigma analyze",
        tags: ["query"],
        description: "Analyze data using Sigma notation.",
        command: "SUM(val1, valn)",
        icon: <FunctionOutlined />,
      },
      {
        id: "command-3",
        title: "worflow start",
        tags: ["name"],
        description: "Start a workflow by specifying its name.",
        command: "create workflow(name)",
        icon: <ClusterOutlined />,
      },
    ],
  },
]
