-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2022 a las 21:04:57
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectointegrado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hora` time NOT NULL,
  `codigo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `hora`, `codigo`, `activo`) VALUES
(1, '09:00:00', 'ME', 1),
(2, '10:00:00', 'ME', 1),
(3, '11:00:00', 'ME', 1),
(4, '12:00:00', 'ME', 1),
(5, '13:00:00', 'ME', 1),
(6, '14:00:00', 'ME', 1),
(7, '16:00:00', 'ME', 1),
(9, '17:00:00', 'TE', 1),
(10, '18:00:00', 'TE', 1),
(11, '19:00:00', 'TE', 1),
(12, '20:00:00', 'TE', 0),
(23, '01:00:00', 'ME', 0),
(24, '02:00:00', 'ME', 0),
(26, '03:00:00', 'ME', 0),
(27, '04:00:00', 'ME', 0),
(29, '05:00:00', 'ME', 0),
(30, '06:00:00', 'ME', 0),
(31, '07:00:00', 'ME', 0),
(32, '08:00:00', 'ME', 0),
(33, '15:00:00', 'TE', 0),
(34, '21:00:00', 'TE', 0),
(36, '22:00:00', 'TE', 0),
(37, '23:00:00', 'TE', 0),
(38, '24:00:00', 'TE', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(10, '2022_03_07_154542_create_reservahoras_table', 1),
(11, '2022_03_14_185145_create_reservahoras_table', 2),
(32, '2014_10_12_000000_create_users_table', 3),
(33, '2014_10_12_100000_create_password_resets_table', 3),
(34, '2019_08_19_000000_create_failed_jobs_table', 3),
(35, '2019_12_14_000001_create_personal_access_tokens_table', 3),
(36, '2022_03_07_154334_create_tipopistas_table', 3),
(37, '2022_03_07_154408_create_tamanopistas_table', 3),
(38, '2022_03_07_154430_create_pistas_table', 3),
(39, '2022_03_07_154511_create_horarios_table', 3),
(40, '2022_03_07_154522_create_reservas_table', 3),
(41, '2022_03_16_152616_create_reservahoras_table', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pistas`
--

CREATE TABLE `pistas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `numeracion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exterior` tinyint(1) NOT NULL,
  `tipopista_id` bigint(20) UNSIGNED NOT NULL,
  `tamanopista_id` bigint(20) UNSIGNED NOT NULL,
  `iluminacion` tinyint(1) NOT NULL,
  `valoracion` int(11) NOT NULL,
  `imagen` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pistas`
--

INSERT INTO `pistas` (`id`, `numeracion`, `exterior`, `tipopista_id`, `tamanopista_id`, `iluminacion`, `valoracion`, `imagen`) VALUES
(3, 'A1', 0, 1, 1, 1, 3, 'p1.png'),
(4, 'P1', 1, 1, 1, 1, 0, 'p2.png'),
(5, 'P2', 0, 1, 1, 1, 4, 'p4.jpg'),
(6, 'P3', 1, 1, 1, 0, 5, 'p5.jpg'),
(7, 'P6', 1, 2, 1, 0, 3, 'p6.png'),
(8, 'P7', 1, 3, 1, 0, 3, 'p7.jpg'),
(20, 'P500', 1, 1, 2, 1, 3, 'p1.png'),
(23, 'P96324', 0, 1, 2, 1, 3, 'p1.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservahoras`
--

CREATE TABLE `reservahoras` (
  `idR` int(100) NOT NULL,
  `fecha` date NOT NULL,
  `horario_id` bigint(20) UNSIGNED NOT NULL,
  `codigo_pista` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reserva_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reservahoras`
--

INSERT INTO `reservahoras` (`idR`, `fecha`, `horario_id`, `codigo_pista`, `reserva_id`) VALUES
(310, '2022-05-14', 1, 'A1', 93),
(311, '2022-05-14', 2, 'A1', 93),
(312, '2022-05-14', 3, 'A1', 93),
(313, '2022-05-14', 4, 'A1', 93),
(314, '2022-05-14', 5, 'A1', 93),
(315, '2022-05-14', 6, 'A1', 93),
(316, '2022-05-14', 7, 'A1', 93),
(317, '2022-05-14', 9, 'A1', 93),
(304, '2022-05-19', 1, 'A1', 92),
(305, '2022-05-19', 2, 'A1', 92),
(306, '2022-05-19', 3, 'A1', 92),
(307, '2022-05-19', 4, 'A1', 92),
(308, '2022-05-19', 5, 'A1', 92),
(327, '2022-05-20', 5, 'A1', 97),
(328, '2022-05-20', 6, 'A1', 97),
(329, '2022-05-20', 7, 'A1', 97),
(319, '2022-05-27', 1, 'A1', 95),
(320, '2022-05-27', 2, 'A1', 95),
(321, '2022-05-27', 3, 'A1', 95),
(322, '2022-05-27', 4, 'A1', 95),
(323, '2022-05-27', 5, 'A1', 95),
(324, '2022-05-27', 6, 'A1', 95),
(325, '2022-05-27', 7, 'A1', 95),
(331, '2022-05-27', 9, 'A1', 99),
(332, '2022-05-27', 10, 'A1', 99),
(333, '2022-05-27', 11, 'A1', 99),
(334, '2022-05-30', 1, 'P1', 100),
(335, '2022-05-30', 2, 'P1', 100),
(336, '2022-05-30', 3, 'P1', 100),
(337, '2022-05-30', 4, 'P1', 100),
(338, '2022-05-30', 5, 'P1', 100),
(339, '2022-05-30', 6, 'P1', 100),
(340, '2022-05-30', 7, 'P1', 100),
(341, '2022-05-30', 9, 'P1', 100),
(342, '2022-05-30', 10, 'P1', 100),
(343, '2022-05-30', 11, 'P1', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(91, 1, '2022-05-02 18:42:41', '2022-05-02 18:42:41'),
(92, 3, '2022-05-03 08:24:41', '2022-05-03 08:24:41'),
(93, 1, '2022-05-03 08:31:16', '2022-05-03 08:31:16'),
(94, 1, '2022-05-03 09:15:05', '2022-05-03 09:15:05'),
(95, 3, '2022-05-11 17:49:43', '2022-05-11 17:49:43'),
(97, 3, '2022-05-12 14:07:04', '2022-05-12 14:07:04'),
(99, 3, '2022-05-12 14:59:37', '2022-05-12 14:59:37'),
(100, 3, '2022-05-13 15:38:04', '2022-05-13 15:38:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tamanopistas`
--

CREATE TABLE `tamanopistas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tamano` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tamanopistas`
--

INSERT INTO `tamanopistas` (`id`, `tamano`) VALUES
(1, '1.00'),
(2, '2.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipopistas`
--

CREATE TABLE `tipopistas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `suelo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipopistas`
--

INSERT INTO `tipopistas` (`id`, `suelo`) VALUES
(1, 'Cesped'),
(2, 'Cemento'),
(3, 'Resina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellidos`, `email`, `activo`, `password`, `tipo`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Sara', 'San', 'sara@g.com', 0, '$2y$10$8odUU6OMsQmZUp/9zuG5guw6ZIk95bm65HEtY1P6x/SZ.JRTwo8hK', 2, NULL, '2022-03-16 15:02:42', '2022-03-16 15:02:42'),
(3, 'Jesus', 'Sanchez Laramas', 'jesus@g.com', 0, '$2y$10$L.IZyLe5PodF3zKD4b10MeQWrn9rwOsYK.PeKY0OK5hXo.13bV4wq', 2, NULL, '2022-03-16 15:03:50', '2022-05-03 08:26:07'),
(4, 'Paco', 'Ramirez', 'paco@g.com', 0, '$2y$10$AmEbaeHkexo0J7cpZPbgAu9I1JzaGoYz24UdDo3vnDgiIq.SlrpU2', 1, NULL, '2022-03-16 15:05:32', '2022-03-16 15:05:32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `pistas`
--
ALTER TABLE `pistas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pistas_numeracion_unique` (`numeracion`),
  ADD KEY `pistas_tipopista_id_foreign` (`tipopista_id`),
  ADD KEY `pistas_tamanopista_id_foreign` (`tamanopista_id`);

--
-- Indices de la tabla `reservahoras`
--
ALTER TABLE `reservahoras`
  ADD PRIMARY KEY (`fecha`,`horario_id`,`codigo_pista`),
  ADD UNIQUE KEY `clave` (`idR`),
  ADD KEY `reservahoras_reserva_id_foreign` (`reserva_id`),
  ADD KEY `reservahoras_horario_id_foreign` (`horario_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservas_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `tamanopistas`
--
ALTER TABLE `tamanopistas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipopistas`
--
ALTER TABLE `tipopistas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pistas`
--
ALTER TABLE `pistas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `reservahoras`
--
ALTER TABLE `reservahoras`
  MODIFY `idR` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=344;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `tamanopistas`
--
ALTER TABLE `tamanopistas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipopistas`
--
ALTER TABLE `tipopistas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pistas`
--
ALTER TABLE `pistas`
  ADD CONSTRAINT `pistas_tamanopista_id_foreign` FOREIGN KEY (`tamanopista_id`) REFERENCES `tamanopistas` (`id`),
  ADD CONSTRAINT `pistas_tipopista_id_foreign` FOREIGN KEY (`tipopista_id`) REFERENCES `tipopistas` (`id`);

--
-- Filtros para la tabla `reservahoras`
--
ALTER TABLE `reservahoras`
  ADD CONSTRAINT `reservahoras_horario_id_foreign` FOREIGN KEY (`horario_id`) REFERENCES `horarios` (`id`),
  ADD CONSTRAINT `reservahoras_reserva_id_foreign` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
