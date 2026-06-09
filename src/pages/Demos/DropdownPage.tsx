import React, { ReactElement } from "react";
import Dropdown, { DropdownMenuItem } from "../../components/UI/Dropdown/Dropdown";
import { DropdownItem } from "../../components/UI/Dropdown/DropdownItem";
import { ColorDefinitions, IconDefinitions } from "../../lib/utils/definitions";
import Fieldset from "../../components/Typography/Fieldset/Fieldset";
import Checkbox from "../../components/Forms/Checkbox/Checkbox";
import Icon from "../../components/UI/Icons/Icon/Icon";

const menuItems: DropdownMenuItem[] = [
    { id: "1", content: "Profile", onClick: () => alert("Profile clicked") },
    { id: "2", content: "Settings", onClick: () => alert("Settings clicked") },
    { id: "3", content: "Logout", onClick: () => alert("Logout clicked") },
];

const menuItemsDivider: DropdownMenuItem[] = [
    { id: "1", content: "Profile", onClick: () => alert("Profile clicked") },
    { id: "2", content: "Settings", onClick: () => alert("Settings clicked") },
    {  id: '4',divider: true},
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
        content:<Icon icon={IconDefinitions.burger} />
    },
    {
        id: "settings",
        content:<Icon icon={IconDefinitions.table_cog} />
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
                        content: <span>Dark Theme</span>,
                        prefix: <Checkbox/>,
                        keepOpen: true,                      
                    },
                    {
                        id: "notifications",
                        content: <span>Meldingen</span>,
                        prefix: <Checkbox />,
                        keepOpen: true,
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
            <Fieldset legend="Default" legendBorderColor={ColorDefinitions.Surface} fieldsetCss="mt-3">
                <div className="grid">
                    <div>
                        <h3>Default</h3>
                        <Dropdown
                            trigger={{
                                label: 'Click me!'
                            }}
                            menuItems={menuItems}
                        />
                    </div>
                    <div>
                        <h3>With devider</h3>
                        <Dropdown
                            trigger={{
                                label: 'Click me!'
                            }}
                            menuItems={menuItemsDivider}
                        />
                    </div>
                    <div>
                        <h3 className="mt-3">With header</h3>
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
                    </div>
                    <div>
                        <h2 className="mt-3">With footer</h2>
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
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Scroll content" legendBorderColor={ColorDefinitions.Surface} fieldsetCss="mt-3">
                <div className="grid">
                    <div>
                        <h3 className="mt-3">Default with Scroll content</h3>
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
                    </div>
                    <div>

                        <div>
                            <h3 className="mt-3">Tabs with scroll content </h3>
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
                        </div>
                    </div>
                </div>
            </Fieldset>


            <Fieldset legend="Search" legendBorderColor={ColorDefinitions.Surface} fieldsetCss="mt-3">
                <div className="grid">
                    <div>
                        <h2 className="mt-3">Default search</h2>
                        <Dropdown
                            menuItems={menuItems}
                            trigger={{ label: 'Click me!' }}
                            enableSearch
                            search={{
                                placeholder: "Zoek een gebruiker...",
                                noResultsText: "Geen gebruikers gevonden"
                            }}
                        />

                    </div>
                    <div>
                        <h2 className="mt-3">With header</h2>
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
                    </div>
                    <div>
                        <h2 className="mt-3">With header with border</h2>
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

                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Tabs" legendBorderColor={ColorDefinitions.Surface} fieldsetCss="mt-3">
                <div className="grid">
                    <div>
                        <h2 className="mt-3">Default tabs</h2>
                        <Dropdown
                            trigger={{
                                label: 'Click me!'
                            }}
                            tabItems={tabItems}
                            tabs={tabContent}
                        />
                    </div>
                    <div>
                        <h2 className="mt-3">With header</h2>
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
                    </div>
                    <div>
                        <h2 className="mt-3">With footer</h2>
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
                    </div>
                    <div>
                        <h2 className="mt-3">With search</h2>
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
                    </div>
                </div>
            </Fieldset>

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
        </>
    )
}

export default DropdownPage;
