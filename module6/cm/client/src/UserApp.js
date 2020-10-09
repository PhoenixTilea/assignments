import React from "react";

import { CampaignContextProvider } from "./context/CampaignContext";
import { CharacterContextProvider } from "./context/CharacterContext";
import { MonsterContextProvider } from "./context/MonsterContext";
import { MonTypeContextProvider } from "./context/MonTypeContext";
import Dashboard from "./dashboard/Dashboard";

export default function UserApp() {
	return (
		<CampaignContextProvider>
			<CharacterContextProvider>
				<MonTypeContextProvider>
					<MonsterContextProvider>
						<Dashboard />
					</MonsterContextProvider>
				</MonTypeContextProvider>
			</CharacterContextProvider>
		</CampaignContextProvider>
	);
}