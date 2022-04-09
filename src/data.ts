import type { IOptions, Site } from "./types";

export const defaultOptions: IOptions = {
    labels: [
        {
            value: "praise",
            label: "praise",
            icon: "trophy",
            description: "Praises highlight something positive. Try to leave at least one of these comments per review. _Do not_ leave false praise (which can actually be damaging). _Do_ look for something to sincerely praise.",
        },
        {
            value: "nitpick",
            label: "nitpick",
            icon: "focus-2",
            description: "Nitpicks are small, trivial, but necessary changes. Distinguishing nitpick comments significantly helps direct the reader's attention to comments requiring more involvement.",
        },
        {
            value: "suggestion",
            label: "suggestion",
            icon: "lightbulb",
            description: "Suggestions propose improvements to the current subject. It's important to be explicit and clear on _what_ is being suggested and _why_ it is an improvement. Consider using patches and the _blocking_ or _non-blocking_ decorations to further communicate your intent.",
        },
        {
            value: "issue",
            label: "issue",
            icon: "bug",
            description: "Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a `suggestion`. If you are not sure if a problem exists or not, consider leaving a `question`.",
        },
        {
            value: "question",
            label: "question",
            icon: "question",
            description: "Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.",
        },
        {
            value: "thought",
            label: "thought",
            icon: "discuss",
            description: "Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.",
        },
        {
            value: "chore",
            label: "chore",
            icon: "hammer",
            description: "Chores are simple tasks that must be done before the subject can be \"officially\" accepted. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.",
        },
    ],
    decorations: [
        {
            value: "non-blocking",
            label: "non-blocking",
            icon: "lock-unlock",
            description:
                "A comment with this decoration **should not** prevent the subject under review from being accepted. This is helpful for organizations that consider comments blocking by default.",
        },
        {
            value: "blocking",
            label: "blocking",
            icon: "lock",
            description:
                "A comment with this decoration **should** prevent the subject under review from being accepted, until it is resolved. This is helpful for organizations that consider comments non-blocking by default.",
        },
        {
            value: "if-minor",
            label: "if-minor",
            icon: "star-half",
            description:
                "This decoration gives some freedom to the author that they should resolve the comment only if the changes ends up being minor or trivial.",
        },
    ]
};

export const defaultSites: Site[] = [
    {
        name: "Azure DevOps",
        filters: [
            {
                urlMatches: "https?:\/\/(dev\.azure\.com){1}[\/\w\d\sA-Za-z0-9-_]*(pullrequest\/[0-9])+"
            }
        ],
        additionalStyles: '.repos-pr-details-page{position:relative;}'
    }
];