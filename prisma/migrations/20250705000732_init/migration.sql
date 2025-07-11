-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `dataCriacao` VARCHAR(191) NOT NULL,
    `dataAtualizacao` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
