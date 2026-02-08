"use client";
import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
} from '@heroui/react';
import HeaderAuth from '@/components/header-auth'

export default function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">
                EntraId Test
                </Link>
            </NavbarBrand>
            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}