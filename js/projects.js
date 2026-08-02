/* ==================================================================
   PROJECT DATA
   EDIT: Copy any complete object to add a new project. Keep each `id`
   unique. Add GitHub/Roblox URLs when available; empty links are hidden.
   Supported media: .png, .jpg, .jpeg, .webp, and .gif.
   ================================================================== */
window.PORTFOLIO_PROJECTS = [
    {
        id: "evolution",
        title: "EVOlution",
        categories: ["Games", "Systems", "UI"],
        status: "Prototype",
        role: "Programmer and game designer",
        description: "An evolution-based Roblox game where players consume objects, gain experience, unlock creatures, and use unique abilities.",
        longDescription: "A progression prototype that explores a satisfying consume-and-evolve gameplay loop. Players build experience, unlock distinct creatures, and learn creature-specific abilities and passives while supporting systems manage shops, emotes, persistent progress, and moment-to-moment UI feedback. it was inspired by a browser game (EvoWorld.io)",
        technologies: ["Luau", "Roblox Studio","OOP","FSM","Open-Source Libraries"],
        systems: [
            "Creature progression", "Experience system", "Ability system",
            "Creature-specific passives", "Shops", "Emote system", "UI systems",
            "Data saving", "Player progression", "Custom gameplay mechanics"
        ],
        cover: {
            src: "assets/projects/evolution-cover.png",
            type: "image",
            label: "Project Cover",
            alt: "EVOlution Roblox game project cover"
        },
        media: [
            {
                src: "assets/projects/evolution-gameplay.gif",
                type: "gif",
                label: "Gameplay",
                alt: "EVOlution creature gameplay demonstration"
            },
            {
                src: "assets/projects/evolution-ui.png",
                type: "image",
                label: "UI",
                alt: "EVOlution progression user interface"
            }
        ],
        githubUrl: "",
        robloxUrl: "https://www.roblox.com/games/81736342024597/EVolutiOn-Rework"
    },
    {
        id: "shuriken-obby",
        title: "Shuriken Obby",
        categories: ["Games", "Systems","UI"],
        status: "Prototype",
        role: "Programmer and game designer",
        description: "A Roblox obstacle game built around throwing a shuriken and teleporting to its location, creating a unique movement and puzzle mechanic.",
        longDescription: "Shuriken Obby is a movement-based obstacle game built around one main mechanic: throw a shuriken and teleport to wherever it lands. I developed the game entirely on my own, handling the programming, game design, UI/UX, level design, visual effects, progression systems, and overall player experience. I also created the custom projectile and teleportation systems, added slow-motion feedback, and designed each obstacle to turn the movement mechanic into a skill-based challenge.",
        technologies: ["Luau", "Object-oriented programming", "Roblox Studio", "Server validation"],
        systems: [
            "Custom movement", "Shuriken throwing", "Teleportation mechanics",
            "Slow-motion effects", "Shops", "Daily rewards", "Anti-cheat validation",
            "UI systems", "Player progression"
        ],
        cover: {
            src: "assets/projects/shuriken-obby-cover.png",
            type: "image",
            label: "Project Cover",
            alt: "Shuriken Obby Roblox game project cover"
        },
        media: [
            {
                src: "assets/projects/ShurikenObby1.png",
                type: "Image",
                label: "Gameplay",
                alt: "Gameplay"
            },
            {
                src: "assets/projects/ShurikenObbyDemo1.gif",
                type: "gif",
                label: "Gameplay",
                alt: "Shuriken throw and teleport mechanic demonstration"
            },
            {
                src: "assets/projects/ShurikenObbyDemo2.gif",
                type: "gif",
                label: "Shuriken UI",
                alt: "Shuriken UI"
            },
             {
                src: "assets/projects/ShurikenObbyDemo3.gif",
                type: "gif",
                label: "Shop UI",
                alt: "Shop UI"
            }
        ],
        githubUrl: "",
        robloxUrl: ""
    },
    {
        id: "emote-system",
        title: "Roblox Emote System",
        categories: ["Systems", "UI", "Tools"],
        status: "Completed System",
        role: "Programmer and UI developer",
        description: "A reusable Roblox emote system featuring an emote wheel, searchable emote list, saved emotes, animation controls, and configurable settings.",
        longDescription: "A configurable emote package designed for reuse across Roblox experiences. It includes quick access through an emote wheel, a searchable library, saved favorites, predictable animation controls, and clean configuration points for developers and designers.",
        technologies: ["Luau", "Roblox Studio", "Modular architecture", "UI systems"],
        systems: [
            "Emote wheel", "Searchable emote list", "Saved emotes",
            "Animation handling", "Settings", "Modular architecture",
            "UI transitions", "Reusable configuration"
        ],
        cover: {
            src: "assets/projects/EmoteWheel.png",
            type: "image",
            label: "Project Cover",
            alt: "Roblox emote system project cover"
        },
        media: [
            {
                src: "assets/projects/emote-system.gif",
                type: "gif",
                label: "System Demo (Toggle)",
                alt: "Roblox emote system interaction demonstration"
            },
            {
                src: "assets/projects/EmoteWheelEdit.gif",
                type: "gif",
                label: "System Demo (Edit)",
                alt: "Roblox emote system interaction demonstration"
            },
            {
                src: "assets/projects/EmoteWheelDance.gif",
                type: "gif",
                label: "System Demo (Play)",
                alt: "Roblox emote system interaction demonstration"
            }
        ],
        githubUrl: "",
        robloxUrl: ""
    }
];
