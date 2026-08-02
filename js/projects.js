/* ==================================================================
   PROJECT DATA
   EDIT: Copy any complete object to add a new project. Keep each `id`
   unique. Add GitHub/Roblox URLs when available; empty links are hidden.
   Supported media: .png, .jpg, .jpeg, .webp, and .gif.
   ================================================================== */
window.PORTFOLIO_PROJECTS = [
    {
        id: "battlegrounds",
        title: "Battlegrounds Fighting Game",
        categories: ["Games", "Systems", "UI"],
        status: "In Development",
        role: "Programmer, game designer, system designer, and UI/UX designer",
        description: "A round-based Roblox fighting game featuring character-specific attacks, responsive movement, multiplayer combat systems, custom interfaces, voting, and expandable game architecture.",
        longDescription: "A combat-focused Roblox experience designed around responsive controls and readable player feedback. The project uses modular character kits, validated client-server communication, state-driven combat, and round management so new fighters, maps, and modes can be added without rewriting the foundation.",
        technologies: ["Luau", "Rojo", "Finite State Machines", "Roblox Studio", "Client-server networking"],
        systems: [
            "Character controllers", "Combat architecture", "M1 attack system",
            "Dash system", "Damage handling", "Hitbox system", "Status effects",
            "Animation system", "Round management", "Map and mode voting",
            "Custom UI", "Sound handling", "Cooldown system"
        ],
        cover: {
            src: "assets/projects/battlegrounds-cover.png",
            type: "image",
            label: "Project Cover",
            alt: "Battlegrounds fighting game project cover"
        },
        media: [
            {
                src: "assets/projects/battlegrounds-combat.gif",
                type: "gif",
                label: "Combat",
                alt: "Battlegrounds combat system demonstration"
            },
            {
                src: "assets/projects/battlegrounds-dash.gif",
                type: "gif",
                label: "Movement",
                alt: "Battlegrounds dash mechanic demonstration"
            },
            {
                src: "assets/projects/battlegrounds-ui.png",
                type: "image",
                label: "UI",
                alt: "Battlegrounds voting interface"
            }
        ],
        // EDIT: Paste public project links below. Leave empty to hide the button.
        githubUrl: "",
        robloxUrl: ""
    },
    {
        id: "evolution",
        title: "EVOlution",
        categories: ["Games", "Systems", "UI"],
        status: "Prototype",
        role: "Programmer and game designer",
        description: "An evolution-based Roblox game where players consume objects, gain experience, unlock creatures, and use unique abilities.",
        longDescription: "A progression prototype that explores a satisfying consume-and-evolve gameplay loop. Players build experience, unlock distinct creatures, and learn creature-specific abilities and passives while supporting systems manage shops, emotes, persistent progress, and moment-to-moment UI feedback.",
        technologies: ["Luau", "Roblox Studio", "DataStoreService", "UI systems"],
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
        robloxUrl: ""
    },
    {
        id: "shuriken-obby",
        title: "Shuriken Obby",
        categories: ["Games", "Systems"],
        status: "Prototype",
        role: "Programmer and game designer",
        description: "A Roblox obstacle game built around throwing a shuriken and teleporting to its location, creating a unique movement and puzzle mechanic.",
        longDescription: "A movement-driven obstacle game built around one strong mechanic: throw a shuriken, then teleport to its landing point. The prototype combines custom projectile behavior, carefully validated teleportation, slow-motion feedback, and progression features to turn traversal into a skill-based puzzle.",
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
                src: "assets/projects/shuriken-teleport.gif",
                type: "gif",
                label: "Ability",
                alt: "Shuriken throw and teleport mechanic demonstration"
            },
            {
                src: "assets/projects/shuriken-gameplay.png",
                type: "image",
                label: "Gameplay",
                alt: "Shuriken Obby gameplay scene"
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
            src: "assets/projects/emote-system-cover.png",
            type: "image",
            label: "Project Cover",
            alt: "Roblox emote system project cover"
        },
        media: [
            {
                src: "assets/projects/emote-system.gif",
                type: "gif",
                label: "System Demo",
                alt: "Roblox emote system interaction demonstration"
            },
            {
                src: "assets/projects/emote-wheel.png",
                type: "image",
                label: "UI",
                alt: "Radial emote wheel interface"
            }
        ],
        githubUrl: "",
        robloxUrl: ""
    }
];
