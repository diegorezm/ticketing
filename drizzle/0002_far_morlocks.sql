CREATE TABLE `organization_roles` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`role` text NOT NULL,
	`permission` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `organizationRoles_organizationId_idx` ON `organization_roles` (`organization_id`);--> statement-breakpoint
CREATE INDEX `organizationRoles_role_idx` ON `organization_roles` (`role`);