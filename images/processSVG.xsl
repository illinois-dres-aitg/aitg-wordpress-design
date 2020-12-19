<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:svg="http://www.w3.org/2000/svg">

  <xsl:output method="text" encoding="UTF-8" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    const xmlns = 'http://www.w3.org/2000/svg';
    <xsl:apply-templates/>
    <xsl:text>
    return svg;&#xa;&#xa;</xsl:text>
  </xsl:template>

  <xsl:template match="svg:svg">
    <xsl:call-template name="default">
      <xsl:with-param name="name" select="name()"/>
    </xsl:call-template>

    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="svg:title|svg:desc">
    <!-- JavaScript output: -->
    let <xsl:value-of select="name()"/> = document.createElementNS(xmlns, '<xsl:value-of select="name()"/>');
    let text = document.createTextNode('<xsl:value-of select="."/>');
    <xsl:value-of select="name()"/>.appendChild(text);
    <xsl:call-template name="appendChild">
      <xsl:with-param name="currentName" select="name()"/>
      <xsl:with-param name="parentName" select="name(..)"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template match="svg:*">
    <!-- current element name and id -->
    <xsl:variable name="cname" select="name()"/>
    <xsl:variable name="cid" select="count(ancestor::*[$cname=name()]) + count(preceding::*[$cname=name()])"/>
    <xsl:variable name="currentName">
      <xsl:choose>
        <xsl:when test="$cid=0">
          <xsl:value-of select="$cname"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat($cname, $cid)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- parent element name and id -->
    <xsl:variable name="pname" select="name(..)"/>
    <xsl:variable name="pid" select="count(../ancestor::*[$pname=name()]) + count(../preceding::*[$pname=name()])"/>
    <xsl:variable name="parentName">
      <xsl:choose>
        <xsl:when test="$pid=0">
          <xsl:value-of select="$pname"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat($pname, $pid)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:call-template name="default">
      <xsl:with-param name="name" select="$currentName"/>
    </xsl:call-template>

    <xsl:call-template name="appendChild">
      <xsl:with-param name="currentName" select="$currentName"/>
      <xsl:with-param name="parentName" select="$parentName"/>
    </xsl:call-template>

    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template name="default">
    <xsl:param name="name"/>

    <!-- JavaScript output: -->
    let <xsl:value-of select="$name"/> = document.createElementNS(xmlns, '<xsl:value-of select="name()"/>');
    <xsl:for-each select="@*">
      <xsl:value-of select="$name"/>.setAttributeNS(null, '<xsl:value-of select="name()"/>', '<xsl:value-of select="."/>');
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="appendChild">
    <xsl:param name="currentName"/>
    <xsl:param name="parentName"/>

    <!-- JavaScript output: -->
    <xsl:value-of select="$parentName"/>.appendChild(<xsl:value-of select="$currentName"/>);
  </xsl:template>

</xsl:transform>
