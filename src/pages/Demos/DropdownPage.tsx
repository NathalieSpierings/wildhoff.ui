import React, { ReactElement } from "react";
import Dropdown, { DropdownMenuItem } from "../../components/UI/Dropdown/Dropdown";
import { DropdownItem } from "../../components/UI/Dropdown/DropdownItem";
import { ColorDefinitions } from "../../lib/utils/definitions";
import Fieldset from "../../components/Typography/Fieldset/Fieldset";

const menuItems: DropdownMenuItem[] = [
    { id: "1", content: "Profile", onClick: () => alert("Profile clicked") },
    { id: "2", content: "Settings", onClick: () => alert("Settings clicked") },
    { id: "3", content: "Logout", onClick: () => alert("Logout clicked") },
];

const manyMenuItems: DropdownMenuItem[] = [];
for (let i = 1; i <= 20; i++) {
    manyMenuItems.push(
        {
            id: `${i}`,
            content: `Menu item ${i}`,
            onClick: () => alert(`Menu item ${i} clicked!`),
            children: [
                {
                    id: `${i}`,
                    content: `Menu item ${i}`,
                    onClick: () => alert(`Menu item ${i} clicked!`),
                    children: [
                        {
                            id: `${i}`,
                            content: `Menu item ${i}`,
                            onClick: () => alert(`Menu item ${i} clicked!`),
                        }
                    ]
                }
            ]
        }
    );
}

const tabItems = [
    {
        id: "users",
        label: "Users"
    },
    {
        id: "settings",
        label: "Settings"
    }
];

const tabContent = [
    {
        tabId: "users",
        tabPane: [
            {
                id: "users-section",
                menuItems: [
                    {
                        id: "admins",
                        prefix: "👤",
                        content: "Beheerders",
                        children: [
                            {
                                id: "admin1",
                                content: "John Doe",
                                onClick: () => alert("John")
                            },
                            {
                                id: "admin2",
                                content: "Jane Doe",
                                onClick: () => alert("Jane")
                            }
                        ]
                    },
                    {
                        id: "employees",
                        divider: true,
                        prefix: "👥",
                        content: "Medewerkers"
                    }
                ]
            }
        ]
    },
    {
        tabId: "settings",
        tabPane: [
            {
                id: "settings-section",
                menuItems: [
                    {
                        id: "theme",
                        content: (
                            <label>
                                <input
                                    type="checkbox"
                                />
                                Dark Theme
                            </label>
                        )
                    },
                    {
                        id: "notifications",
                        content: (
                            <label>
                                <input
                                    type="checkbox"
                                />
                                Meldingen
                            </label>
                        )
                    }
                ]
            }
        ]
    }
];

const longTabContentItems = [
    {
        tabId: "users",
        tabPane: [
            {
                id: "users-section",
                menuItems: [
                    { id: "overview", content: "Overzicht", prefix: "📊" },

                    {
                        id: "org",
                        content: "Organisatie",
                        prefix: "🏢",
                        children: [
                            {
                                id: "departments",
                                content: "Afdelingen",
                                children: [
                                    {
                                        id: "dev",
                                        content: "Development",
                                        children: [
                                            { id: "frontend", content: "Frontend", onClick: () => alert("Frontend") },
                                            { id: "backend", content: "Backend", onClick: () => alert("Backend") }
                                        ]
                                    },
                                    {
                                        id: "ops",
                                        content: "Operations",
                                        children: [
                                            { id: "infra", content: "Infrastructure", onClick: () => alert("Infra") },
                                            { id: "support", content: "Support", onClick: () => alert("Support") }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        id: "admins",
                        content: "Beheerders",
                        prefix: "👤",
                        children: [
                            { id: "admin1", content: "John Doe", onClick: () => alert("John") },
                            { id: "admin2", content: "Jane Doe", onClick: () => alert("Jane") },
                            { id: "admin3", content: "Bruce Wayne", onClick: () => alert("Bruce") }
                        ]
                    },

                    {
                        id: "employees",
                        content: "Medewerkers",
                        prefix: "👥",
                        children: [
                            { id: "emp1", content: "Alice" },
                            { id: "emp2", content: "Bob" },
                            { id: "emp3", content: "Charlie" },
                            { id: "emp4", content: "David" },
                            { id: "emp5", content: "Eva" }
                        ]
                    },

                    { id: "contractors", content: "Contractors", prefix: "🧰" },
                    { id: "interns", content: "Stagiairs", prefix: "🎓" },
                    { id: "hr", content: "HR", prefix: "🏢" },
                    { id: "finance", content: "Finance", prefix: "💰" },
                    { id: "it", content: "IT", prefix: "💻" },
                    { id: "sales", content: "Sales", prefix: "📈" },
                    { id: "marketing", content: "Marketing", prefix: "📣" },
                    { id: "support", content: "Support", prefix: "🎧" },
                    { id: "legal", content: "Legal", prefix: "⚖️" },
                    { id: "security", content: "Security", prefix: "🔒" },
                    { id: "data", content: "Data", prefix: "📊" },
                    { id: "research", content: "Research", prefix: "🔬" }
                ]
            }
        ]
    },

    {
        tabId: "settings",
        tabPane: [
            {
                id: "settings-section",
                menuItems: [
                    { id: "general", content: "Algemeen" },

                    {
                        id: "appearance",
                        content: "Uiterlijk",
                        children: [
                            {
                                id: "theme",
                                content: "Theme",
                                children: [
                                    {
                                        id: "dark",
                                        content: "Dark mode",
                                        onClick: () => alert("Dark")
                                    },
                                    {
                                        id: "light",
                                        content: "Light mode",
                                        onClick: () => alert("Light")
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        id: "notifications",
                        content: "Meldingen",
                        children: [
                            { id: "email", content: "Email notificaties" },
                            { id: "push", content: "Push notificaties" }
                        ]
                    },

                    { id: "privacy", content: "Privacy" },
                    { id: "security", content: "Beveiliging" },
                    { id: "profile", content: "Profiel" },
                    { id: "billing", content: "Facturatie" },
                    { id: "api", content: "API keys" },
                    { id: "integrations", content: "Integraties" },
                    { id: "logs", content: "Logs" },
                    { id: "backup", content: "Backups" },
                    { id: "export", content: "Export" },
                    { id: "import", content: "Import" },
                    { id: "advanced", content: "Geavanceerd" },
                    { id: "beta", content: "Beta features" }
                ]
            }
        ]
    }
];

const DropdownPage = (): ReactElement => {

    return (
        <>
            <h2>Default</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                menuItems={menuItems}
            />


            <h2 className="mt-3">Header</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                header={{
                    content: <strong>
                        Application settings
                    </strong>,
                    borderColor: ColorDefinitions.Surface
                }}
                menuItems={menuItems}
            />

            <h2 className="mt-3">Footer</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                footer={{
                    content: <button>
                        Save
                    </button>,
                    borderColor: ColorDefinitions.Surface
                }}
                menuItems={menuItems}
            />

            <h2 className="mt-3">Header and footer</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                header={{
                    content: <strong>
                        Application settings
                    </strong>,
                    borderColor: ColorDefinitions.Surface
                }}
                footer={{
                    content: <button>
                        Save
                    </button>,
                    borderColor: ColorDefinitions.Surface
                }}
                menuItems={menuItems}
            />

            <h2 className="mt-3">Long content</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                menuItems={manyMenuItems}
            />

            <h2 className="mt-3">Header and footer and long content</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                header={{
                    content: <strong>
                        Application settings
                    </strong>,
                    borderColor: ColorDefinitions.Surface
                }}
                footer={{
                    content: <button>
                        Save
                    </button>,
                    borderColor: ColorDefinitions.Surface
                }}
                menuItems={manyMenuItems}
            />


            <Fieldset legend="Horizontal directions" legendBorderColor={ColorDefinitions.Surface} fieldsetCss="mt-3">

                <div className="grid">
                    <div>
                        <h2>Left</h2>
                        <Dropdown horizontalPlacement="left"
                            trigger={{
                                label: 'Open Dropdown'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                    <div>
                        <h2>Right</h2>
                        <Dropdown horizontalPlacement="right"
                            trigger={{
                                label: 'Open Dropdown'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                </div>
            </Fieldset>


            <Fieldset legend="Vertical directions" legendBorderColor={ColorDefinitions.Surface} fieldsetCss="mt-3">

                <div className="grid">
                    <div>
                        <h2>Down</h2>
                        <Dropdown verticalPlacement="down"
                             trigger={{
                                label: 'Click me!'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                    <div>
                        <h2>Up</h2>
                        <Dropdown verticalPlacement="up"
                             trigger={{
                                label: 'Click me!'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Vertical & vertical directions" legendBorderColor={ColorDefinitions.Surface} fieldsetCss="mt-3" >

                <div className="grid">
                    <div>
                        <h2>Down left</h2>
                        <Dropdown verticalPlacement="down" horizontalPlacement="left"
                             trigger={{
                                label: 'Click me!'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                    <div>
                        <h2>Down right</h2>
                        <Dropdown verticalPlacement="down" horizontalPlacement="right"
                             trigger={{
                                label: 'Click me!'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                </div>

                <div className="grid">
                    <div>
                        <h2>Up left</h2>
                        <Dropdown verticalPlacement="up" horizontalPlacement="left"
                             trigger={{
                                label: 'Click me!'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                    <div>
                        <h2>Up right</h2>
                        <Dropdown verticalPlacement="up" horizontalPlacement="right"
                             trigger={{
                                label: 'Click me!'
                            }}
                            header={{
                                content: <strong>
                                    Application settings
                                </strong>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            footer={{
                                content: <button>
                                    Save
                                </button>,
                                borderColor: ColorDefinitions.Surface
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                            maxHeight={350}
                        />
                    </div>
                </div>

            </Fieldset>


            <h2 className="mt-3">With tabs</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                tabItems={tabItems}
                tabs={tabContent}
            />

            <h2 className="mt-3">With tabs and long content</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                tabItems={tabItems}
                tabs={longTabContentItems}
            />

            <h2 className="mt-3">With tabs and header</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                header={{
                    content: <strong>
                        Application settings
                    </strong>,
                    borderColor: ColorDefinitions.Surface
                }}
                tabItems={tabItems}
                tabs={tabContent}
            />

            <h2 className="mt-3">With tabs and footer</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                footer={{
                    content: <button>
                        Save
                    </button>,
                    borderColor: ColorDefinitions.Surface
                }}
                tabItems={tabItems}
                tabs={tabContent}
            />


            <h2 className="mt-3">With tabs and header footer</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                header={{
                    content: <strong>
                        Application settings
                    </strong>,
                    borderColor: ColorDefinitions.Surface
                }}
                footer={{
                    content: <button>
                        Save
                    </button>,
                    borderColor: ColorDefinitions.Surface
                }}
                tabItems={tabItems}
                tabs={tabContent}
            />


            <h2 className="mt-3">With tabs and header long content and footer</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                header={{
                    content: <strong>
                        Application settings
                    </strong>,
                    borderColor: ColorDefinitions.Surface
                }}
                footer={{
                    content: <button>
                        Save
                    </button>,
                    borderColor: ColorDefinitions.Surface
                }}
                tabItems={tabItems}
                tabs={longTabContentItems}
            />

            <h2 className="mt-3">With search </h2>
            <Dropdown
                menuItems={menuItems}
                trigger={{ label: 'Click me!' }}
                enableSearch
                search={{
                    placeholder: "Zoek een gebruiker...",
                    noResultsText: "Geen gebruikers gevonden"
                }}
            />

            <h2 className="mt-3">With search and header with border</h2>
            <Dropdown
                menuItems={menuItems}
                trigger={{ label: 'Click me!' }}
                header={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                enableSearch
                search={{
                    placeholder: "Zoek een gebruiker...",
                    noResultsText: "Geen gebruikers gevonden"
                }}
            />

            <h2 className="mt-3">With search and header</h2>
            <Dropdown
                menuItems={menuItems}
                trigger={{ label: 'Click me!' }}
                header={{ borderColor: ColorDefinitions.Surface, content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                enableSearch
                search={{
                    placeholder: "Zoek een gebruiker...",
                    noResultsText: "Geen gebruikers gevonden"
                }}
            />

            <h2 className="mt-3">With search and header with border and footer and long content</h2>
            <Dropdown
                menuItems={manyMenuItems}
                trigger={{ label: 'Click me!' }}
                header={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                enableSearch
                search={{
                    placeholder: "Zoek een gebruiker...",
                    noResultsText: "Geen gebruikers gevonden"
                }}
                footer={{
                    content: <button>
                        Save
                    </button>,
                    borderColor: ColorDefinitions.Surface
                }}
            />


            <h2 className="mt-3">Search With tabs</h2>
            <Dropdown
                trigger={{
                    label: 'Click me!'
                }}
                enableSearch
                search={{
                    placeholder: "Zoek een gebruiker...",
                    noResultsText: "Geen gebruikers gevonden"
                }}
                tabItems={tabItems}
                tabs={tabContent}
            />
        </>
    )
}

export default DropdownPage;
