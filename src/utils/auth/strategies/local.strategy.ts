// import { Strategy as LocalStrategy } from 'passport-local';
// import { PrismaClient, User } from '@prisma/client';

// const prisma = new PrismaClient()

// const localStrategy: any = new LocalStrategy(
//     { usernameField: 'username' },
//     async (email: string, password: string, done: any) => {
//         try {
//             const user: User | null = await prisma.user.findUnique({
//                 where: {
//                     email: email
//                 },
//             })

//             if (!user) {
//                 return done(null, false);
//             }

//             const isMatch = await user.comparePassword(password);

//             if (!isMatch) {
//                 return done(null, false);
//             }

//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }
// );

// export default localStrategy;