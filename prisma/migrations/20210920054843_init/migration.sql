-- CreateTable
CREATE TABLE `api_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_name` VARCHAR(50) NOT NULL,
    `client_secret` VARCHAR(250) NOT NULL,
    `client_key` VARCHAR(50) NOT NULL,
    `date_created` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_updated` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
