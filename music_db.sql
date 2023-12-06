/*The sql command to create the our working database and tables*/

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `song` varchar(255) NOT NULL,
  `rating` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `ratings` (`id`, `username`, `artist`, `song`, `rating`) VALUES
(5, 'harry', '告五人', '带我去找夜生活', 3),
(8, 'Patton', '告五人', '带我去找夜生活', 5),
(19, 'harry123', '周杰伦', '晴天', 5),
(20, 'harry123', '周杰伦', '菊花台', 5),
(21, 'harry123', 'Rosa Walton', 'I really want to stay at your house', 5),
(22, 'harry123', '告五人', '唯一', 4),
(23, 'harry123', 'G.E.M.邓紫棋', '摩天动物园', 4),
(24, 'harry123', 'G.E.M.邓紫棋', 'Fly Away', 5),
(25, 'harry', 'G.E.M.邓紫棋', '透明', 5),
(26, 'harry', '告五人', '晴天', 4);

CREATE TABLE `username` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `username` (`username`, `password`) VALUES
('1', '$2y$10$bYWyVn4ngFC5ApW2X.B9pOdp17bV6S.07Vy3X8hOg/HRDm5ai.Swm'),
('123', '$2y$10$8XYMb13PTvZrv0zn.i.4tOH92eYu.npjmCadGYgc6awsGKLaYF9De'),
('1234567890', '$2y$10$elysEQ1m3ibNfWZ7n/f7bONFy2EqkJof.aHdX.T4Ivjy5PmJEabGW'),
('2', '$2y$10$Laqymynkbmst/UPh8OdcyeDR/CEGxpT7VRHccEPOICUhZ0STBvxvu'),
('22', '$2y$10$OOb3x/URD9i4rLZLPBpv8u5FHvwuw1vI0JnozDk9.0XlxIv23.jzW'),
('3', '$2y$10$SlJv99Q/BPnQE3ulK4ymluMp4mkR8ypF0MtXp.XQfhBFBDeebD75O'),
('a', '$2y$10$Us7Oj7Ux8G9iaGnButvEVemUG1A5jVOaZQNmJx7PuA9iqkd3U.f.K'),
('atlas', '$2y$10$rccJUOdEQ37J6vLB1SfWzuZNjw3wOP..27uNXCK8cEzWDcbtjJXai'),
('atlas2', '$2y$10$kCRorUOEXnPtLE78alI1V.MHgpPPndWcve6fBZuh.unJCufuIfJwi'),
('harry', '$2y$10$hSztiQ8jv4daPVMgbiUHKucsAtZ6B7vndEReToB2IrDd43NoUqEdO'),
('harry123', '$2y$10$kU3rLEtZGUzk0w9Xt46H7uur8gwzcfc5Rv1xpW2haWfkg3YMtoxJi'),
('harry2', '$2y$10$zVyU4/5lusP6SAVx5D8A.u4Gpu38EgCtVZlnam838O6QN6/lEiPmy'),
('harry22', '$2y$10$z4JdCCLki85r/U5796HVY.dc.IqYiWVL5LQiZR.CKH64GWJbKNvMm'),
('harry23', '$2y$10$AvfIkXnFrWtteNVt4Brepe6EbfQ7bb.N3kSqO8LWHhfZhoY.1v5La'),
('harry33', '$2y$10$D2sriWe..QPzS1rSZo4m1uFGdMS0U/ryalTTPa4rCjb.r0osxQKI6'),
('harry333', '$2y$10$THWWQ2jrXzSEGNnsAJdjCeCDkUBRK20cP8BoUSIoOB4f7e.3EQP.a'),
('harry3332', '$2y$10$th.GWTYU7WbGewYyzWH9kesfmKSdmNKBebpZZvEUkl.L.Bt0SCVAe'),
('harry555', '$2y$10$R5Dx5/Ln31WTJ2jxo/a.iuSxkg4NrSX8Rnp.X/hacdxPWgOcIw/0S'),
('harryasasd', '$2y$10$LQyHbv3aj0bmoPSo8/JNxOxwTLgMLkz.MNybgjwxSvQh0yMjVtsye'),
('hasd', '$2y$10$QToX9F5g4vL05ApTJgD33e0JtMu5HRnBEVEQlSkHk9dHUpIE2hlfm'),
('Patton', '$2y$10$i4Dt6zmNbe0jYeeqFITGuO68HSpmDKiB1A0uPbycRyi6kXZnE5eKy'),
('pattonyin', '$2y$10$Mw72pmMsBYJDy62LcjgP3uB5EarI6/UsAmm1AFxDWNUm33p92WOYC'),
('user1', '$2y$10$RjKBzgszElmRzfmvNWna6eqwIAStIAE6rqn3wC2yFHS66bagAy8By');


ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

ALTER TABLE `username`
  ADD PRIMARY KEY (`username`);


ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;


ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`username`) REFERENCES `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
