'use client'
import Image from "next/image";
import React, {useState} from "react";
import Link from "next/link";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import {motion, useScroll, useSpring, useMotionValueEvent} from 'framer-motion'

const Header =  () => {
 
  const { userId } = useAuth();


  const {user} =  useUser()

    const [hidden, setHidden] = useState(false);
    const { scrollY, scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
    useMotionValueEvent(scrollY, 'change', (latest) =>{
      const previous = scrollY.getPrevious()
      if(latest > previous && latest > 100 ) {
        setHidden(true)
      }
      else {
        setHidden(false)
      }
    })
  return (
    <>
      <motion.nav    variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={` border-orange-300 top-0 sticky z-50 bg-darkGrey`} >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-darkGold">
              <Image alt="Logo" width={64} height={22} src="/logo-color.png" className="w-auto h-auto lg:mr-4"/>
              <div className="text-[.8rem] lg:text-lg uppercase font-bold<">
                Write The Story
              </div>
            </Link>
          </div>
          <div className="text-white flex items-center">
            {!userId && (
              <>
                <Link href="/sign-in" className="text-lightGold hover:text-darkGold mr-4">
                  Sign In
                </Link>
                <Link href="/sign-up" className="text-lightGold hover:text-darkGold mr-4">
                  Sign Up
                </Link>
              </>
            )}
            {
              user && <>
              <p className="text-lightGold hover:text-darkGold mr-4">
              Hello {`${user.firstName}`}
              </p>
              </>
            }
            <div className="ml-auto">
            <UserButton afterSignOutUrl="/"/>
            </div>
          </div>
        </div>
        <div className="absolute h-2 w-full origin-left z-[200]" style={{ scaleX }}>
        <motion.div   style={{ scaleX }} className={`origin-left bg-orange-400 h-2`}></motion.div>
      </div>
      </motion.nav>
    </>
  );
};

export default Header;
